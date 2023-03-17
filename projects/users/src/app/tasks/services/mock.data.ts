import { Injectable } from '@angular/core';
import { Task } from '../../../models/task.model';
import { HttpClient } from '@angular/common/http';

export const getTasks = async (): Promise<Task[]> => [
  { id: 1, title: 'Tarea 1', owner: 'Pepe', isCompleted: false },
  { id: 2, title: 'Tarea 2', owner: 'Ernestina', isCompleted: false },
];

@Injectable({
  providedIn: 'root',
})
export class TasksRepoService {
  constructor(public http: HttpClient) {}

  createTask() {
    return this.http.post(
      '',
      {},
      {
        headers: {},
      }
    );
  }
}
