import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'sdi-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  isDisplayForm: boolean;
  newUserForm: FormGroup;
  // @Output() added: EventEmitter<User>;
  constructor(public fb: FormBuilder, public srv: UsersService) {
    // this.added = new EventEmitter();
    this.isDisplayForm = false;
    this.newUserForm = fb.group({
      firstName: ['', [Validators.required]],
      surname: ['', [Validators.required]],
    });
  }

  handleSubmit() {
    console.log('Submit');
    const newUser: User = {
      id: 3,
      firstName: this.newUserForm.value.title,
      surname: this.newUserForm.value.owner,
      isAdmin: false,
    };
    // this.added.next(newUser);
    this.srv.handleAdd(newUser);
    this.newUserForm.reset();
  }
}
