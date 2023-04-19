# RandomIdeas App

This is a fullstack application in which the user can play a quiz game.

This app includes a Node.js/Express REST API that uses MongoDB for a database. The client-side is built with Webpack.

## Usage

### Install Dependencies

Install dependencies on the front-end and back-end

```bash
npm install
cd client
npm install
```

### Back-end/Express Server

```bash
npm start
```

or

```bash
npm run dev (Nodemon)
```

Visit `http://localhost:8000`

### Front-end/Webpack Dev Server

```bash
cd client
npm run dev
```

Visit `http://localhost:3000`

To build front-end production files

```bash
cd client
npm run build
```

The production build will be put into the `public` folder, which is the Express static folder.

### Environment Variables

Rename `.env-example` to `.env` and add your MongoDB URI to the `.env` file

```
MONGO_URI=your_mongodb_uri
```

### Short Description

A request is made to the QuestionsApi class to either get all questions or fetch questions a by category

The QuestionsApi class makes an HTTP request to the /api/questions endpoint of the Node.js server using the axios library.

The Node.js server receives the request and routes it to the appropriate endpoint, which is defined in the questionsRouter module.

The questionsRouter module handles the request by calling the appropriate function, (only get() for now) depending on the request.

The function in the questionsRouter module uses the Question model to interact with the database and either retrieves all questions or adds a new question.

The result of the database interaction is returned as a response to the original HTTP request.
