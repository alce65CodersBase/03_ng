import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SdiFormControl } from 'projects/core/src/lib/types/forms';
import { UserRegister } from 'projects/users/src/models/user.model';
import { UserRepoService } from '../../services/user.repo.service';

type RegisterFormGroup = {
  firstName: FormControl<UserRegister['firstName'] | null>;
  surname: FormControl<UserRegister['surname'] | null>;
  email: FormControl<UserRegister['email'] | null>;
  passwd: FormControl<UserRegister['passwd'] | null>;
};

@Component({
  selector: 'sdi-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  userRegister!: UserRegister;
  form: FormGroup<RegisterFormGroup>;
  controls: SdiFormControl[];
  constructor(private fb: FormBuilder, private repo: UserRepoService) {
    this.form = fb.group({
      firstName: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      passwd: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.controls = [
      {
        id: 'firstName',
        label: 'first name',
        type: 'text',
        errorMessages: [{ key: 'required', msg: 'required field' }],
      },
      {
        id: 'surname',
        label: 'surname',
        type: 'text',
        errorMessages: [{ key: 'required', msg: 'required field' }],
      },
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

  register() {
    if (
      !this.form.value.firstName ||
      !this.form.value.surname ||
      !this.form.value.email ||
      !this.form.value.passwd
    )
      return;
    this.userRegister = {
      firstName: this.form.value.firstName,
      surname: this.form.value.surname,
      email: this.form.value.email,
      passwd: this.form.value.passwd,
    };
    console.log('SEND Register', this.userRegister);
    this.repo.createRegister(this.userRegister).subscribe();
  }
}
