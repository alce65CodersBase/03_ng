import { Component } from '@angular/core';
import { UserStateService } from '../services/user.state.service';

@Component({
  selector: 'sdi-user',
  template: `
    <ng-container *ngIf="state === 'login'">
      <sdi-login></sdi-login>
      <p>
        Si no tienes cuenta,
        <br />
        puedes
        <span (click)="handleClick('register')" role="button"
          >registrarte aquí</span
        >
      </p>
    </ng-container>
    <ng-container *ngIf="state === 'register'">
      <sdi-register></sdi-register>
      <p>
        Volver a
        <span (click)="handleClick('login')" role="button">login</span>
      </p>
    </ng-container>
    <ng-container *ngIf="state === 'logout'">
      <sdi-logout></sdi-logout>
    </ng-container>
  `,
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  state!: 'login' | 'logout' | 'register';
  constructor(public userStateSrv: UserStateService) {
    this.userStateSrv.userLogged$.subscribe((user) => {
      this.state = user === null ? 'login' : 'logout';
      console.log(this.state);
    });
  }
  handleClick(state: 'register' | 'login') {
    this.state = state;
  }
}
