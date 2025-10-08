import { Component, OnInit  } from '@angular/core';
import { SessionStorageService } from './auth/services/session-storage.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

// export class AppComponent implements OnInit {
export class AppComponent {
  title = 'courses-app';

  //test
  // constructor(private session: SessionStorageService) {}
  // ngOnInit(): void {
  //   this.session.deleteToken();
  //   this.session.setToken('via-service');
  //   console.log('TOKEN =', this.session.getToken()); 
  // }
  //test
}
