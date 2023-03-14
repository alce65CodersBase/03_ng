# Core

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.0.

Inicialmente contiene un módulo CoreModule con el componente CoreComponent
junto con el servicio CoreService



## Configuración

Añadir scss

```shell
ng config schematics.@schematics/angular:component.styleext scss
```

## Code scaffolding

Run `ng generate component component-name --project core` to generate a new component. 
You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project core`.
> Note: Don't forget to add `--project core` or else it will be added to the default project in your `angular.json` file. 

## Other ng commands

- **Build**. Run `ng build core` to build the project. The build artifacts will be stored in the `dist/` directory.
- **Publishing**. After building your library with `ng build core`, go to the dist folder `cd dist/core` and run `npm publish`.
- **Running unit tests**. Run `ng test core` to execute the unit tests via [Karma](https://karma-runner.github.io).
- **Further help**. To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Componentes standAlone

Se utiliza para probar los componentes standalone 

```shell
ng g c layout --project core --standalone
```

Al usar la librería en una aplicación, se importa directamente el componente:

```ts

import { LayoutComponent } from 'projects/core/src/lib/layout/layout.component';

@NgModule({
  imports: [
    LayoutComponent,
  ],
})
export class AppModule {}
```
