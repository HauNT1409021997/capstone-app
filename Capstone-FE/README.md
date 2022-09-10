# CapstoneFe

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Component explain
- Logic component:
  - The actor page component:
    Features:
      Create, update, Search, Remove actor from database
      Actor created can be casted into a movie in the movie component
  - The intro page component:
    Features:
      Only show as the initial loading page.
  - The movies page component
    Features:
      Create, update, Search, Remove movie from database
      Moive can cast actor from the actor component

- UI component:
  -The menubar component:
    Features:
      Display links to transist between other components
  -The list component:
    Features:
      Display list passed into it component
      Perform pagination for data requested from server

- All the api of components are invoked from the service according to their own service

- Intercepotor is used conjuction with the auth service to implement auth0. This service will be used to authorize accessed role.

- Server domain are stored in the environment file along with auth0 authorization parameters.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
