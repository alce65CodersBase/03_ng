import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material.module';
import { FileInputComponent } from './file-input.component';

describe('FileInputComponent', () => {
  let component: FileInputComponent;
  let fixture: ComponentFixture<FileInputComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileInputComponent],
      imports: [MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FileInputComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click the button selecting a file', () => {
    spyOn(component, 'onFileSelected').and.callThrough();
    const debugButton = debugElement.query(By.css('button'));
    debugButton.triggerEventHandler('click');
    expect(component.onFileSelected).toHaveBeenCalled();
  });

  it('should use the file input without selecting a file', () => {
    spyOn(component, 'onFileSelected').and.callThrough();
    const debugButton = debugElement.query(By.css('[type="file"]'));
    debugButton.triggerEventHandler('click', {
      currentTarget: null,
    });
    expect(component.onFileSelected).toHaveBeenCalled();
    expect(component.onFileSelected).toThrowError();
  });

  it('should use the file input selecting a file', () => {
    spyOn(component, 'onFileSelected').and.callThrough();
    const debugButton = debugElement.query(By.css('[type="file"]'));
    debugButton.triggerEventHandler('click', {
      currentTarget: {
        files: [
          {
            name: 'testFile',
          },
        ],
      },
    });
    expect(component.onFileSelected).toHaveBeenCalled();
    component.fileEvent.subscribe((file) => expect(file.name).toBe('testFile'));
  });
});
