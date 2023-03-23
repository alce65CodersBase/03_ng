import { Observable } from 'rxjs';

export interface ApiRepo<T extends { id: unknown }, E> {
  loadItems(): Observable<T[] | E>;
  getItem(id: T['id']): Observable<T | E>;
  createItem(task: Omit<T, 'id'>): Observable<T | E>;
  updateItem(task: Partial<T>): Observable<T | E>;
  deleteItem(id: T['id']): Observable<object | E>;
}
