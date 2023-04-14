import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sdi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      passwd: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  handleSubmit() {
    const formData = new FormData();
    formData.append('email', this.form.controls['email'].value);
    formData.append('passwd', this.form.controls['passwd'].value);

    formData.forEach((value) => console.log('Submit', value));
    this.auth.login(formData);
  }
}
