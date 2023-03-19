# Courses

Sample project in the FEM Course "Angular 13 Fundamentals"

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
