# InfratechSA

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.13.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## DockerFile

To build the Docker image, run:

```bash
docker build -t infratech-app .
```

To run the Docker container:

```bash
docker run -p 8080:80 infratech-app
```

Then open your browser at http://localhost:8080/.

## Git and version control

Repository hosted on GitHub: [https://github.com/AlonsoL-bit/Infratech-S.A]

Development done in feature/* branches

At least 10 meaningful commits made

.gitignore configured to exclude dist/ and node_modules

## Project structure

/src/app/ — Angular source code, modularized

/dist/ — Compiled build files (not committed)

Dockerfile — Production container configuration

.gitignore — Git ignore settings

README.md — Project documentation
For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
