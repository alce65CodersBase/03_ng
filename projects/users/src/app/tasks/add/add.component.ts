import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'sdi-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  isDisplayForm: boolean;
  newTaskForm: FormGroup;
  @Output() added: EventEmitter<Task>;
  constructor(public fb: FormBuilder) {
    this.added = new EventEmitter();
    this.isDisplayForm = false;
    this.newTaskForm = fb.group({
      title: ['Nueva tarea', [Validators.required]],
      owner: ['', [Validators.required]],
    });
  }

  handleSubmit() {
    console.log('Submit');
    const newTask: Task = {
      id: 3,
      title: this.newTaskForm.value.title,
      owner: this.newTaskForm.value.owner,
      isCompleted: false,
    };
    this.added.next(newTask);
    this.newTaskForm.reset();
  }
}
