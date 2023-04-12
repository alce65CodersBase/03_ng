# Courses Application

Sample project in the FEM Course "Angular 13 Fundamentals"

By **Lukas Ruebbelke**

```shell
ng g app courses --routing -p sdi --style scss 
```

Add Angular Material (Update package json)

```shell
ng add @angular/material --project <project-name>
```

? Choose a prebuilt theme name, or "custom" for a custom theme: Indigo/Pink
[ Preview: https://material.angular.io?theme=indigo-pink ]
? Set up global Angular Material typography styles? No
? Include the Angular animations module? Include and enable animations

UPDATE projects/courses/src/app/app.module.ts (502 bytes)
UPDATE angular.json (8122 bytes)
UPDATE projects/courses/src/index.html (552 bytes)
UPDATE projects/courses/src/styles.scss (181 bytes)

Alternative in a project

```shell
ng g @angular/material:ng-add --project <project-name>
```

## Configure Sonar Analysis

- Add in Sonar new project in the repositories selection, importing new monorepo: alce65codersbase_03_ng_app_courses
- Create a secret in Sonar and add it to the GitHub repo settings (SONAR_TOKEN_APP_COURSES)
- Add new GitHub Actions
  - Testing
  - Sonar
- Add configuration file for sonar
- Add package.json

```json
"test:prod": "ng test --code-coverage --no-watch --browsers=ChromeHeadless"
```

- Add karma.config to the project

```shell
ng g config karma --project courses
```

- Update karma

  - require("karma-mocha-reporter")
  - coverageReporter: {
      reporters: [{ type: "text" }, { type: "lcov" }],
      includeAllSources: true,
    }
  - reporters: ["mocha", "kjhtml"],

## Configure Angular Material

Create file src/app/materia.module.ts
Import the module in app.module.ts

```ts
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonToggleModule,
  ],
})
export class MaterialModule {}
```

Remove the app.component placeholder
Add basic Material structure to app.component

## Routing

Se definen en app component las rutas de la aplicación en un objeto links, del tipo MenuOption

```ts
type MenuOption = {
  path: string;
  icon: string;
  title: string;
};
```

Se añaden las rutas

- Home
- Courses

Se crean los Módulos/Componentes correspondientes
Se actualiza app Router con las rutas definidas en app.component

```shell
ng g m home -m app --route home --project courses
ng g m courses -m app --route courses --project courses   
```

Se crea el módulo Core, no lazy

```shell
ng g m core -m app --project courses  
ng g c core/menu --project courses  
```

Se añade el componente menu en app component

```html
<nav>
  <a mat-button class="nav-link"
  *ngFor="let link of links"
  [routerLink]="link.path" routerLinkActive="active">
    <mat-icon>{{link.icon}}</mat-icon>
    {{link.title}}
  </a>
</nav>
```

Se consume el componente menu en app component

## Courses

Se crea el modelo de datos y umn servicio con un mock de datos iniciales

Se añade en el componente Courses

- La lista de cursos
- El detalle del componente seleccionado

Se crean los métodos responsables de

- Seleccionar un curso
- Eliminar un curso

## Lessons

Se crea el modelo de datos y umn servicio con un mock de datos iniciales

Se añade en el componente Home

- La lista de lecciones
- El detalle del componente seleccionado

Se crea el método responsable de

- Seleccionar un curso

## Courses Form

En el componente Courses, en la parte correspondiente al detalle,
se añade un formulario capaz de mostrar los datos de un curso,
editarlos o crear un curso nuevo.

Se utiliza un formulario template driven asociando directamente
los ngModel de cada control con la propiedad selectedCourse,
de forma que el formulario toma de la propiedad sus valores iniciales.

## Server connection

Se crea un Repo.Interface que define las operaciones estándar de un API Rest

```ts
export interface ApiRepo<T extends { id: unknown }> {
  loadItems(): Observable<T[]>;
  getItem(id: T['id']): Observable<T>;
  createItem(task: Omit<T, 'id'>): Observable<T>;
  updateItem(task: Partial<T>): Observable<T>;
  deleteItem(id: T['id']): Observable<void>;
}
```

Se implementa en Courses.Api.Repo.Service para obtener la lista de los cursos a partir de un API

El Api se pude crear fácilmente utilizando JSON.Server
En este caso se utiliza un backend con Express

Se crea un CoursesApiRepo extendiendo el interfaz.
Se implementan las funciones utilizando httpClient
Se utiliza un pipe de observables para ajustar los datos 
de la respuesta del server al formato definido en el interface
Se añade un control de errores

En el componente Courses se añaden las funcionalidades de:

- cargar los datos del API
- añadir cursos al API (create)
- actualizar los cursos del API (update)
- eliminar cursos del API (delete)

## Prueba de un componente "file upload"

- Se crea en Core-Module y se exporta
- Se utiliza desde Register component (en home module)
