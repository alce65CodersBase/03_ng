import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  greetings() {
    console.log('Hola');
  }
}
