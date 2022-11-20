# workflow-management-system-frontend
Workflow management system for the Irrigation Department

## Components

### package.json
This file contain all the necessary packages needed by the application and React to build the application. This file contain the dependencies along with its used version to rebuild the development code basis in any system.

### src directory
This directory contains all the necessary development codes for the frontend and also the tests.
This directory contains many components from atomic to fully integrated. App.js file is the App Component, main component in React which acts as a container for all other components. Since React is basically used to build single page web application, we use Router from route.js to navigate to different pages.

### public directory
This directory contain the all the static components used in the system, that will be accessbile to the client using the built system.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:
if any of the below npm commands fails include `--legacy-peer-deps` at the end of the command. eg. `npm install --legacy-peer-deps`

### `npm install`

Installs the necessary dependencies for the development and production.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
