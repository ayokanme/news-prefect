# News Prefect

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![React-Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![MaterialUI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)
![NYTimes-for-Devs](https://developer.nytimes.com/files/poweredby_nytimes_150c.png?v=1583354208341)
![Bcrypt.js](https://img.shields.io/badge/Bcrypt.js-2.4.3-green)
![Axios](https://img.shields.io/badge/axios--http-0.26.1-green)

Stay in the know (powered by the NYTimes Top Stories and Newswire APIs)

## Framework

The frontend of this application was built with React.js. React Router was used for routing.

## User Interactions

- The user can create an account or log into a previously created account
- The user is able to refresh the page and maintain access to their account
- The user can display top stories from the NYTimes website
- The user can display the most recent articles from any section of the NYTimes website
- The user can bookmark an article to view later
- The bookmarked articles are persisted on a database for viewing later
- The user can remove a previously bookmarked article when they are no longer interested in keeping it
- The user is able to display a large version of the article thumbnail in a modal window
- The user is able to display and copy (via button click), the short link to the article they are viewing if it is available
- The user is able to log out of their account and prevent access to their bookmarked articles
- The user is able to delete their account and all their bookmarked articles after authentication through a password modal form

## Backend Service

- The app is served by an Express server that controls interactions between the NYTimes API, database, and the client. The server controls access from the browser client with a session cookie after password authentication. Authenticated clients are permitted to create, read, update and delete their account and bookmark data.

- MongoDB is used to store the user's account, session, and bookmark data.

- Bcryptjs is used to hash and salt the passwords before storage in the database, as well as to create the session ID that is attached to the browser via a cookie.

## Architectural Style

- The app is built in the MVVM design pattern

- The backend model can be found in the src/ directory. The server and database helpers that control it are in the src/helpers directory

- The View Models are in the client/src/component directory

- The Views are controlled by the routes in the client/src/routes directory

## Third Party API

- NYTimes TopStories and Newswire API

## Material UI components

- Links, Card, Drawer, Modal, Box, TextField, Button, Switch

## Reusable Components

- The ArticleList component is used by the home (top stories), sections, and bookmarks routes to dynamically render each article.

- The ArticleCard component is used by the Article List to render the title (link), byline, abstract, thumbnail, bookmark, and share buttons.

- The AuthForm component is used to collect data for both the login and sign up flows

## Installation Instructions

- signup for a developer account at developer.nytimes.com

- change the `example.env` file to `.env` and past the API key in the field provided

- install dependencies in each of the root and client directories using `npm install`

- build the react app in the client directory using `npm run build`

- start the server using `npm start`

- go to localhost:3333 in your browser to use the app