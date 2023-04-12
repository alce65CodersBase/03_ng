import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sdi-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
})
export class FileInputComponent {
  fileName: string;
  @Output() fileEvent: EventEmitter<File>;

  constructor() {
    this.fileName = '';
    this.fileEvent = new EventEmitter();
  }

  onFileSelected(event: Event) {
    const fileInput = event.currentTarget as HTMLInputElement;
    if (fileInput === null || fileInput.files === null)
      throw new Error('Not file');
    const file: File = fileInput.files[0];

    if (file) {
      this.fileName = file.name;
      this.fileEvent.next(file);
    }
  }
}
