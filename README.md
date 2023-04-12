# 03_ng

Sample project for learning Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.2.

## Installation

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

### CLI Commands

- **Development server**: Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
- **Code scaffolding**: Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
- **Build**: Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
- **Running unit tests**: Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
- **Running end-to-end tests**: Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
- **Further help**: To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

### Git / Github

La instalación del workspace crea el repositorio y le añade el initial commit

Se conecta con el remoto de Github.
Se añade el análisis del repositorio Github en SonarCloud
Se añade el secret SONAR_TOKEN en el repositorio de GitHub
Se incorporan localmente las Github Actions, incluyendo la de Sonar
Se añade el fichero de configuración de Sonar

Se verifican los comandos de sonar:

- linter: npx eslint --ignore-path .gitignore
- test:prod: ng test --code-coverage --no-watch --browsers=ChromeHeadless",

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

## Proyectos

### app USERS + lib CORE

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

### Proyectos separados para Sonar

Para Sonar cada proyecto del monorepo se configura como proyecto independiente,
dándole al repositorio la configuración adecuada como monorepo

- Se añade el análisis del proyecto configurando el repositorio Github en SonarCloud como monorepo
- Se añade el secret SONAR_TOKEN_{{PROJECT}} en el repositorio de GitHub
- Se incorporan localmente las Github Actions
  - Testing: referencia a la carpeta como "working-directory:"
  - Sonar: referencia al Secret y a la carpeta como "with: projectBaseDir:"
- Se añade el fichero de configuración de Sonar

### Configuración testing

Se crea el fichero de configuración de karma y se actualizan los datos de angular.json
en cada proyecto

```shell
ng g config karma --project <project-name> 
```

Se instala el plugin de reporter tipo mocha

```shell
npm i -D karma-mocha-reporter
```

Se actualiza karma.config. Para un repo con un solo proyecto, sería:

```js
  {
    require("karma-mocha-reporter"),
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'lcov' },
        { type: 'text' }
      ],
      includeAllSources: true,
    },
    reporters: ["mocha", "kjhtml"],
  }
```

Se añade un package.json a nivel del proyecto, con el script test:prod

```json
"test:prod": "ng test --code-coverage --no-watch --browsers=ChromeHeadless"
```

## App USERS

Ejemplo inicial de proyecto en Angular

Toma de la lib CORE los standAlone components:

- Layout
  - Header
  - Footer
  - Menu
  - Profile (svg component)
- Controls

### Routing

Se definen de forma Lazy las rutas y sus correspondientes módulos:

- Inicio (Home)
- Taras (Tasks)
- Nosotros (About)
- User (User)

Al tomar el layout de la librería, no es necesario un módulo estático (no lazy)

### Tasks

En el modulo **Tasks** se crea un CRUD de tareas

Los componentes implicados son:

- List (controlador)
- Card (presentador)
- Add (presentador)

El servicio mock.data se limita a proporcionar un mock de datos inicial (2 tareas)

No existe ninguna persistencia de los datos

### Users

En el módulo **About** se crea un CRUD de usuarios

Los componentes implicados son:

- List (presentador)
- Card (presentador)
- Add (presentador)

Toda la lógica del CRUD reside en el servicio UsersService

El servicio mock.data se limita a proporcionar un mock de datos inicial (2 usuarios)

No existe ninguna persistencia de los datos

### Profile

En el módulo **User** se incluyen los componentes necesarios para el proceso de 
registro / login / logout

Existen los servicios

- UserStateService que almacena el estado correspondiente al login/logout
- UserRepoService que encapsula las llamadas a una API

No se a definido ninguna API, por lo que el segundo servicio responde un error por consola