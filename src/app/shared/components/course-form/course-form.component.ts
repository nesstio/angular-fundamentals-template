import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

type AuthorId = string;
interface Author { id: AuthorId; name: string; }

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  form!: FormGroup;
  formSubmitted = false;

  allAuthors: Author[] = [
    { id: 'a1', name: 'John Smith' },
    { id: 'a2', name: 'Ann Baker' },
    { id: 'a3', name: 'Mike Jordan' },
  ];

  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      duration: [0, [Validators.required, Validators.min(0)]],
      authors: this.fb.array<FormControl<AuthorId>>([]), 
      newAuthor: this.fb.group({
        author: this.fb.control('', {
          nonNullable: true,
          validators: [Validators.minLength(2), Validators.pattern(/^[A-Za-z0-9 ]+$/)],
        }),
      }),
    });
  }
  // courseForm!: FormGroup; ????????????

  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
  get title(): AbstractControl | null { return this.form.get('title'); }
  get description(): AbstractControl | null { return this.form.get('description'); }
  get duration(): AbstractControl | null { return this.form.get('duration'); }
  get authorsFA(): FormArray<FormControl<AuthorId>> {
    return this.form.get('authors') as FormArray<FormControl<AuthorId>>;
  }
  get newAuthorName(): FormControl<string> {
    return this.form.get('newAuthor.author') as FormControl<string>;
  }

  get availableAuthors(): Author[] {
    const selected = new Set(this.authorsFA.value);
    return this.allAuthors.filter(a => !selected.has(a.id));
  }
  get courseAuthors(): Author[] {
    const ids = this.authorsFA.value;
    return ids
      .map(id => this.allAuthors.find(a => a.id === id))
      .filter((a): a is Author => !!a);
  }

  addExistingAuthor(a: Author): void {
    if (!this.authorsFA.value.includes(a.id)) {
      this.authorsFA.push(new FormControl(a.id, { nonNullable: true }));
    }
  }
  removeCourseAuthor(a: Author): void {
    const i = this.authorsFA.value.findIndex(id => id === a.id);
    if (i > -1) this.authorsFA.removeAt(i);
  }

  createAuthor(): void {
    const raw = (this.newAuthorName?.value ?? '').toString().trim();
    if (!raw) return; 
    if (this.newAuthorName?.invalid) { this.newAuthorName.markAsTouched(); return; }
    const newAuthor: Author = { id: this.genId(), name: raw };
    this.allAuthors = [...this.allAuthors, newAuthor];
    this.newAuthorName?.reset('');
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const value = this.form.getRawValue(); 
    console.log('Submit:', value);
  }

  controlInvalid(c: AbstractControl | null): boolean {
    return !!c && c.invalid && (c.touched || this.formSubmitted);
  }
  authorNameById(id: AuthorId): string {
    return this.allAuthors.find(a => a.id === id)?.name ?? id;
  }
  // minutesToHhMm(mins: number | null | undefined): string {
  //   const m = Math.max(0, Number(mins ?? 0) | 0);
  //   const h = Math.floor(m / 60);
  //   const mm = (m % 60).toString().padStart(2, '0');
  //   return h ? `${h}h ${mm}m` : `${mm}m`;
  // }

  trackByAuthorId = (_: number, a: Author) => a.id;

  private genId(): string {
    try { // @ts-ignore
      return crypto?.randomUUID?.() ?? `a_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    } catch { return `a_${Date.now()}_${Math.random().toString(36).slice(2)}`; }
  }
}
