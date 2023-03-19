import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SdiFormControl } from '../types/forms';

@Component({
  selector: 'sdi-controls',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent {
  @Input() controls!: SdiFormControl[];
  @Input() formGroup!: FormGroup;
}
