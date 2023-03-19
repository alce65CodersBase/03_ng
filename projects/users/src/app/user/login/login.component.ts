import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserLogin } from 'projects/users/src/models/user.model';
import { UserRepoService } from '../../services/user.repo.service';
import { SdiFormControl } from 'projects/core/src/lib/types/forms';

type LoginFormGroup = {
  email: FormControl<UserLogin['email'] | null>;
  passwd: FormControl<UserLogin['passwd'] | null>;
};

@Component({
  selector: 'sdi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userLogin!: UserLogin;
  form: FormGroup<LoginFormGroup>;
  controls: SdiFormControl[];
  constructor(private fb: FormBuilder, private repo: UserRepoService) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      passwd: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.controls = [
      {
        id: 'email',
        label: 'e-mail',
        type: 'email',
        errorMessages: [
          { key: 'required', msg: 'required field' },
          { key: 'email', msg: 'invalid email format' },
        ],
      },
      {
        id: 'passwd',
        label: 'password',
        type: 'password',
        errorMessages: [
          { key: 'required', msg: 'required field' },
          { key: 'minlength', msg: 'invalid password length, min 8' },
        ],
      },
    ];
  }

  login() {
    if (!this.form.value.email || !this.form.value.passwd) return;
    this.userLogin = {
      email: this.form.value.email,
      passwd: this.form.value.passwd,
    };
    console.log('SEND Login', this.userLogin);
    this.repo.sendLoginData(this.userLogin).subscribe();
  }
}
