This bootstrap is based on this project, please click me. :) [Website link](https://thabiso-hlatshwayo.vercel.app/).

Below you will find some information on how to perform common tasks.

## Table of Contents

- [Introduction](#introduction)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [npm run dev](#npm-run-dev)
  - [npm run build](#npm-run-dev)
  - [npm start](#npm-start)
  - [npm run link](#npm-run-link)
- [Supported browsers](#supported-browsers)
- [Installing a Dependency](#installing-a-dependency) 

## Introduction

```
this project its a simple website where I talk about myself. I show off all my skills, projects I have done and projects I am developing.
```

## Folder Structure 

```
thabiso-hlatshwayo
  | -- components
    | -- amazon
      | -- Amazon.jsx   
    | -- contact
      | -- contact.jsx
    | -- css
      | -- CSS.jsx
    | -- django
      |-- Django.jsx
    | -- docker
      | -- Docker.jsx
    | -- express
      | -- Express.jsx
    | -- flask
      | -- Flask.jsx
    | -- footer
      | -- Footer.jsx
    | -- fyur
      | -- Fyur.jsx
    | -- git
      | -- Git.jsx
    | -- github
      | -- GitHub.jsx
    | -- gude
      | -- Gude.jsx
    | -- html
      | HTML.jsx
    | -- javascript 
      | -- JavaScript.jsx
    | -- loading
      | -- Loading.jsx
    | -- mongo
      | -- Mongo.jsx
    | -- movie 
      | -- Movie.jsx
    | -- mysql 
      | -- MySQL.jsx      
    | -- nav-bar
      | -- NavBar.jsx
    | -- next
      | -- NextJS.lsx
    | -- node
      | -- Node.jsx
    | -- postgresql
      | -- PostgreSQL.jsx
    | -- python
      | -- Python.jsx
    | -- react
      | -- React.jsx
    | -- redux
      | -- Redux.jsx
    | -- sqlalchemy
      | -- SqlAlchemy.jsx
    | -- tailwind
      | -- Tailwind.jsx
    | -- thabiso
      | -- Thabiso.jsx
    | -- trivia
      | -- Trivia.jsx
    | -- typescript
      | -- TypeScript.jsx
  | -- config
    | -- nodemailer.jsx
  | -- lib
    | -- api.js
  | -- pages
    | -- api
      | -- contact.js
    | -- docs
      | -- express
        | -- index.js
      | -- trivia 
        | -- index.js
    | -- projects
      | -- contacts
        | -- index
      | -- express
        | -- index.js
      | -- fyur 
        | --- index.js
      | -- movie
        | -- index.js
      | -- thabiso
        | -- index.js
      | -- trivia
        | -- index.js
    | -- _app.js
    | -- 404.js
    | -- about.js
    | -- contact.js
    | -- index.js
    | -- projects.js
    | -- skills.js
  | -- public
    | -- assets
      | -- logo
      | -- projects
      | -- skills
  | -- styles
    | -- globals.css
    | -- Home.module.css
  | -- utils         
    | -- validation
      | -- validation.js
  | -- eslintrc.json
  | -- .gitignore
  | -- next.config.js
  | -- package-lock.json
  | -- package.json
  | -- postcss.config.js
  | -- README.md
  | -- tailwind.config.js
```

## Installing the project

Make sure you have nodejs installed in your machine. Run this command `npx create-next-app <project-name>` in your terminal.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br>

### `npm start`

Runs a production `build` folder

### `npm run link`

It helps prevent bugs and allow us to write much more readable code


## Supported browsers

NextJS is supported by modern Browsers, this project can either be ran on the below broswers

`Chrome 64+`
`Edge 79+`
`Firefox 67+`
`Opera 51+`
`Safari 12+`

## Installing a Dependency

The generated project includes React, React-Dom and Next as dependencies. It also includes a set of scripts used by Create Next App as a development dependency. You may install other dependencies with `npm` or `yarn`:

You can run the following command to install all the dependencies

`npm install` or if you chose yarn then delete the package-lock.json file and run `yarn install`

or 

run the following commands to install each package

For nodemailer run:

```sh
npm install --save nodemailer
```

Alternatively you may use `yarn`:

```sh
yarn add nodemailer
```

For react-icons run:

```sh
npm install --save react-icons
```

Alternatively you may use `yarn`:

```sh
yarn add react-icons
```

For react-spinners run:

```sh
npm install --save react-spinners
```

Alternatively you may use `yarn`:

```sh
yarn add react-spinners
```

For react-toastify run:

```sh
npm install --save react-toastify
```

Alternatively you may use `yarn`:

```sh
yarn add react-toastify
```