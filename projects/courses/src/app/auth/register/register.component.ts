import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sdi-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup;
  file!: File;
  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      passwd: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      fileName: ['', [Validators.required]],
    });
  }

  handleFile(file: File) {
    this.file = file;
    this.form.patchValue({ fileName: file.name });
  }

  handleSubmit() {
    const formData = new FormData();
    formData.append('email', this.form.controls['email'].value);
    formData.append('passwd', this.form.controls['passwd'].value);
    formData.append('firstName', this.form.controls['firstName'].value);
    formData.append('surname', this.form.controls['surname'].value);
    formData.append('image', this.file);
    formData.forEach((value) => console.log('Submit', value));
    this.auth.register(formData);
  }
}
