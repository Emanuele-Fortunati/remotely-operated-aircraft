# Remotely Operated Aircraft

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.0.
It uses Angular 4, Angular Material, D3.js 3+

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## What I would have done with more time
- Queue for messages sent when connection isn't online. At moment those messages aren't sent.
- Unit and Angular testing
- Cleaner D3GaugeService (at moment is just a porting of a js file found online) - also some work on performances (a debouncer at least!)
- Line Chart
- Using Interfaces for the websocket messages and for most of the properties with type 'any'
- Responsive Design, probably using the flex model
- Perhaps creating submodules, instead of nesting all in the AppModule
- Technically, the altitude gauge should just reach 9 (I think), however I changed it to show the needle moving