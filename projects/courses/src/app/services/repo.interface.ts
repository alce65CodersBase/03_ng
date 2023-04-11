import { Observable } from 'rxjs';

export interface ApiRepo<T extends { id: unknown }> {
  loadItems(): Observable<T[]>;
  getItem(id: T['id']): Observable<T>;
  createItem(item: Omit<T, 'id'>): Observable<T>;
  updateItem(item: Partial<T>): Observable<T>;
  deleteItem(id: T['id']): Observable<void>;
}
