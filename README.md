# 03_ng

Sample project for learning Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.2.

## Instalation

### Workspace

Se crea un workspace sin aplicaciones ni librerías (proyectos)

```shell
npm i -g @angular/cli
cd <parent-folder-outside-workspace>
ng new <workspace> --create-application false
```

Se añade esLint al workspace

```shell
cd <workspace>
ng add @angular-eslint/schematics
npm i -D eslint-config-prettier
ng config cli.schematicCollections "[\"@angular-eslint/schematics\"]"
```

De esta forma se añaden los schematics de eslint y se configuran para que se añadan por defecto al crear proyectos

### Git / Github

La instalación del workspace crea el repositorio y le añade el initial commit

Se conecta con el remoto de Github.
Se añade el análisis del repositorio Github en SonarCloud
Se añade el secret SONAR_TOKEN en el repositorio de GitHub
Se incorporan localmente las Github Actions, incluyendo la de Sonar

Se verifican los comandos de sonar: linter, test:prod...

Se añade husky para los hooks de git

Install husky

```shell
npm i -D husky 

```

Enable Git hooks configuring package.json

```shell
npx husky install
npm pkg set scripts.prepare="husky install"
```

- nombres de rama / protección de main
- longitud mínima de los commits

Se crea la rama de configuración y utiliza

- Commits
- Publicación de la rama
- Creación de la PR
- Verificación de la PR

### Proyectos

Nueva rama feature/project

Se añade un primer proyecto tipo **application**

```shell
cd <workspace>
ng g app <project-name> -p <prefijo> --routing
```

Se añade automáticamente la configuración de ESLint  al proyecto.
Please see `https://github.com/angular-eslint/angular-eslint` for how to add ESLint configuration to your project.

En un proyecto creado antes de instalar eslint, se añade mediante 

```shell
ng g @angular-eslint/schematics:add-eslint-to-project <project-name>
```

El resultado es la configuración de esLint

```shell
CREATE .eslintrc.json (934 bytes)
CREATE projects/users/.eslintrc.json (645 bytes)
UPDATE angular.json (4350 bytes)
```

Se añade un primer proyecto tipo **library**

```shell
cd <workspace>
ng g lib <project-name> -p <prefijo>
```

Se compila para producción localmente

```shell
npm build --project <project-name>
```

Se añade la dependencia en package.json

```json
"dependencies": {
  "core": "file:./dist/core",
},
 ```

Se importa en AppModule el ngMódulo exportado desde la librería

### CLI Commands

- **Development server**: Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
- **Code scaffolding**: Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
- **Build**: Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
- **Running unit tests**: Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
- **Running end-to-end tests**: Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
- **Further help**: To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
