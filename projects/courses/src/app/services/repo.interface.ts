import { Observable } from 'rxjs';

export interface ApiRepo<T extends { id: unknown }> {
  loadItems(): Observable<T[]>;
  getItem(id: T['id']): Observable<T>;
  createItem(task: Omit<T, 'id'>): Observable<T>;
  updateItem(task: Partial<T>): Observable<T>;
  deleteItem(id: T['id']): Observable<void>;
}
