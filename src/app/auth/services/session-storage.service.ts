import { Inject, Injectable, InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('WINDOW', {
  providedIn: 'root',
  factory: () => window,
});

const TOKEN = 'SESSION_TOKEN'; 
// Add your code here

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  constructor(@Inject(WINDOW) private readonly win: Window) {}

  setToken(token: string){
    // Add your code here
    this.win.sessionStorage.setItem(TOKEN, token);
  }

  getToken(){
    // Add your code here
    return this.win.sessionStorage.getItem(TOKEN);
  }

  deleteToken(){
    // Add your code here
    this.win.sessionStorage.removeItem(TOKEN)
  }
}
