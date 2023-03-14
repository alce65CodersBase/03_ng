import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../models/task.model';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'sdi-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  isDisplayForm: boolean;
  newTaskForm: FormGroup;
  @Output() added: EventEmitter<Task>;
  constructor(public fb: FormBuilder, public srv: TasksService) {
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
    // this.onAdd.next(newTask);
    this.srv.handleAdd(newTask);
    this.newTaskForm.reset();
  }
}
