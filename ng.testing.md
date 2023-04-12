# Angular testing

## Components

1. Creates and configures an Angular environment
  `TestBed.configureTestingModule()`
2. Render the Component under test (async process)
  `TestBed.compileComponents()`
3. Create a fixture that holds the Component and provides a convenient interface  
  `fixture = TestBed.createComponent()`
4. Obtain from the fixture the component instance
  `component = fixture.componentInstance`
5. Obtain the DebugElement that wraps the native DOM element
  `debugElement = fixture.debugElement`
6. Trigger the change detection manually
  `fixture.detectChanges()`

```ts
describe('SampleComponent', () => {
  let fixture: ComponentFixture<SampleComponent>;
  let component: SampleComponent;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SampleComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

});
```

### Interactions with the wrapped DOM

DebugElement methods

- **query**
- **queryAll**

Pass **By.css('…')** with a CSS selector to query and queryAll.

Select DOM elements

```ts
const debugElement: DebugElement = debugElement.query(By.css('form'));
const debugElements: DebugElement[] = debugElement.queryAll(By.css('.input'));
```

Fill out form inputs

```ts
debugElements[0].nativeElement.value = '123';.
```

Emit events form the DOM elements

```ts
debugElement.triggerEventHandler('submit');
// Re-render the Component
fixture.detectChanges();
```

Expects about the DOM elements

```ts
expect(debugElement.nativeElement.textContent).toBe('any value');
```
