import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
export type User = {
  id: string;
  email: string;
  passwd: string;
  firstName: string;
  surname: string;
  role: string;
  image: ImageInfo;
};

export type ImageInfo = {
  urlOriginal: string;
  url: string;
  urlOut: string;
  mimetype: string;
  size: number;
};

@Component({
  selector: 'sdi-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup;
  file!: File;
  constructor(private fb: FormBuilder, private http: HttpClient) {
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
    this.makeRegistration(formData);
  }

  makeRegistration(formData: FormData) {
    const apiUrl = 'http://localhost:5600/users/register';
    const upload$ = this.http.post(apiUrl, formData);
    upload$.subscribe();
  }
}
