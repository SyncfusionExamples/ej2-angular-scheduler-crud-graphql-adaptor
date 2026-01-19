<!--
  howto.md
  A step-by-step guide to integrate EJ2 Angular Scheduler with CRUD using GraphQl Adaptor.
-->
# How to integrate EJ2 Angular Scheduler with CRUD using GraphQl Adaptor.

This repository contains a sample full-stack application demonstrating how to show events in Syncfusion Angular Scheduler component using GraphQl. The Angular frontend provides a responsive UI for viewing and managing calendar events.

This project is a skeleton application used to create [Syncfusion Angular Components](https://www.syncfusion.com/angular-ui-components) web application.

## Add Syncfusion Angular component in your application

Refer the following UG documenation for adding Syncfusion Angular component in your application
* [Getting Started of Syncfusion Angular Scheduler component](https://ej2.syncfusion.com/angular/documentation/schedule/getting-started)

## Prerequisites
- Node.js (>= 20.19)
- npm (>= 7.0)
- Angular CLI (= 17)
- Basic familiarity with Angular and GraphQl Adaptor

## Project Structure
```
├── README.md                           # This guide
├── GraphQl                             # Adaptor
│   ├── build    
│   │    ├── index.js    
│   │    ├── index.map  
│   ├── src
│   │    ├── db.js       
│   │    ├── resolver.js                         
│   │    ├── schema.graphql            
│   ├── package.json                     
├── Schedule                             #Frontend
│    ├── src
│    │    ├── app
│    │    │    ├── app-routing-module.ts
│    │    │    ├── app.component.html
│    │    │    ├── app.component.scss
│    │    │    ├── app.component.spec.ts
│    │    │    ├── app.component.ts
│    │    │    ├── app.module.ts
│    ├── environments
│    │    ├── environment.prod.ts
│    │    ├── environment.ts       
│    ├── index.html
│    ├── main.ts
│    ├── polyfills.ts
│    ├── styles.scss
│    ├── test.ts
│    ├── angular.json
│    ├── package.json
├─────── tsconfig.json



```

## GraphQL Server setup

### Installation
1. Open a terminal and navigate to the GraphQl folder:
    ```bash
    cd GraphQl
    ```
2. Install dependencies:
    ```bash
    npm install
    ```

### Start Backend Server

- Open `GraphQl` folder in terminal and run `npm run dev`


## Schedule Frontend Setup

### Start Syncfusion Angular Scheduler 

- Open a terminal and navigate to the Schedule folder
- Run `npm install` to install the required packages.

## Running the Application
1. Navigate to GraphQl folder
      ```bash
    cd GraphQl
    ```
2. Start the GraphQl server:
    ```bash
    npm run dev
    ```
3. Server started running on `http://localhost:4400`
4. Navigate to Schedule folder
      ```bash
    cd Schedule
    ```
5. Start the Schedule Frontend:
    ```bash
    npm start
    ```
6. Navigate to [`http://localhost:4200`](http://localhost:4200) in your browser.

7. You can perform CRUD operation on the events that will be reflected in the Scheduler.

## Output Preview
![Frontend Preview](./SampleOutput/frontend.png)
*Image illustrating the Syncfusion Angular Scheduler*

## Troubleshooting
- **npm install stuck or fails**: Delete node_modules + package-lock.json, restart system, and reinstall using npm install.
- **Karma/Jasmine version errors**: Install matched versions: karma@6.4.0, karma-jasmine@5.1.0, jasmine-core@5.1.0.

## Resources

You can also refer the below resources to know more details about Syncfusion Angular Scheduler components.
* [Demo](https://ej2.syncfusion.com/angular/demos/#/material/schedule/default)
* [Documentation](https://helpej2.syncfusion.com/angular/documentation/schedule/)
* [GraphQL with Syncfusion DataManager](https://ej2.syncfusion.com/angular/documentation/data/adaptors/#graphql-adaptor)