---

# React GraphQL Express App

A full-stack project featuring a React front end and a GraphQL/Express back end. The client uses React and is started with `npm start` from the **client** folder, while the server uses Express and GraphQL and is started with `npm run dev` from the **server** folder.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [License](#license)

## Overview

This project is a full-stack web application that demonstrates the integration of a React-based front end with an Express server using GraphQL. It serves as a template for building modern web applications with a clear separation between client and server concerns.

## Features

- **React Front End:** Interactive UI built with React.
- **GraphQL API:** Efficient data fetching with GraphQL.
- **Express Server:** Robust backend powered by Express.
- **Hot Reloading:** Development experience with live reloading for both client and server.
- **Modular Code Structure:** Organized codebase with separate folders for client and server.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14 or later)
- npm (comes with Node.js)

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install Client Dependencies:**

   ```bash
   cd client
   npm install
   ```

3. **Install Server Dependencies:**

   Open a new terminal tab/window, then:

   ```bash
   cd server
   npm install
   ```

## Usage

### Running the Client

From the **client** folder, start the React development server:

```bash
npm start
```

The React app will typically be available at [http://localhost:3000](http://localhost:3000).

### Running the Server

From the **server** folder, start the Express/GraphQL server:

```bash
npm run dev
```

The backend server will usually be running on [http://localhost:5000](http://localhost:5000) (or as configured).

### Development Workflow

- **Client:** Changes in the React code will trigger hot reloading.
- **Server:** Using `nodemon` (or a similar tool), changes in the server code will automatically restart the server.

## Technologies Used

- **Front End:** React, React Router, Axios (or your preferred HTTP client)
- **Back End:** Express, GraphQL (Apollo Server or similar)
- **Tooling:** npm, nodemon (for development)

## Folder Structure

Below is a suggested folder structure for the project:

```
your-repo/
├── client/           # React front end
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.js
├── server/           # Express and GraphQL back end
│   ├── models/
│   ├── resolvers/
│   ├── schema/
│   └── server.js
├── README.md
└── package.json      # root-level if applicable, or separate for client/server
```

## License

This project is licensed under the [MIT License](LICENSE).
