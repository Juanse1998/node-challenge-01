# Chess Match API Challenge

This challenge involves building a REST API using Node.js and GraphQL to store and manage chess match data. You'll be creating a Dockerfile to set up the development environment and implementing the API endpoints to interact with the data.

## Challenge Objectives:

* **Dockerfile:** Create a Dockerfile that sets up a development environment with Node.js and GraphQL.
* **API Endpoints:** Design and implement REST API endpoints to:
    * **Create:** Add new chess matches to the database.
    * **Read:** Retrieve a list of all chess matches or a specific match by ID.
    * **Update:** Modify existing chess match data.
    * **Delete:** Remove a chess match from the database.
* **Models:** Define data models for chess matches, including:
    * Match ID
    * Date and time
    * Players (White and Black)
    * Result (Win, Loss, Draw)
    * Individual moves (optional)
* **Environment Variables:** Use an `.env` file to store sensitive information like database credentials.
* **Persistence:** Use graphQL to store and manage chess matches.

## Bonus:

* **Move Persistence:** Implement the ability to store individual moves made during a chess match.
* **User Authentication:** Add user authentication to the API to restrict access to certain endpoints.

## Example API Endpoints:

* **GET /matches:** Retrieve a list of all chess matches.
* **GET /matches/:id:** Retrieve a specific chess match by ID.
* **POST /matches:** Create a new chess match.
* **PUT /matches/:id:** Update an existing chess match.
* **DELETE /matches/:id:** Delete a chess match.

## Getting Started:

1. Create a new project directory.
2. Create a `Dockerfile` to set up the development environment.
3. Create a `server.js` file to implement the API logic.
4. Define your data models and create a database connection.
5. Implement the API endpoints.
6. Create an `.env` file to store your database credentials.

## Example Dockerfile:

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
```

## Example Server.js:
```javascript
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Define your GraphQL schema
const schema = buildSchema(`
  type Query {
    matches: [Match]
    match(id: ID!): Match
  }

  type Mutation {
    createMatch(whitePlayer: String!, blackPlayer: String!): Match
    updateMatch(id: ID!, whitePlayer: String, blackPlayer: String, result: String): Match
    deleteMatch(id: ID!): Boolean
  }

  type Match {
    id: ID!
    whitePlayer: String!
    blackPlayer: String!
    result: String
  }
`);

// Define your resolvers
const resolvers = {
  Query: {
    matches: () => {
      // Retrieve all matches from the database
    },
    match: (_, { id }) => {
      // Retrieve a specific match by ID
    }
  },
  Mutation: {
    createMatch: (_, { whitePlayer, blackPlayer }) => {
      // Create a new match in the database
    },
    updateMatch: (_, { id, whitePlayer, blackPlayer, result }) => {
      // Update an existing match in the database
    },
    deleteMatch: (_, { id }) => {
      // Delete a match from the database
    }
  }
};

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Server listening on port 4000');
});
```

Remember to:

Replace the placeholder comments with your actual database logic.
Configure your database connection and credentials.
Test your API endpoints thoroughly.

## Delivery Instructions
To complete this challenge, you need to:

- **Create a public GitHub repository** for your project.
- **Push your code** to the repository, including:
    - Dockerfile
    - server.js
    - .env file (with placeholder credentials)
    - Any other necessary files (e.g., database configuration, models)
- **Add a clear README.md file** with the following information:
    - **Project Overview:** Briefly describe the project and its purpose.
    - **Setup Instructions:** Provide detailed instructions on how to set up the project, including:
        - **Prerequisites:** List any required software or tools (e.g., Node.js, Docker, a database).
        - **Installation:** Explain how to install dependencies and configure the environment.
        - **Running the API:** Provide steps on how to build and run the Docker image, and start the API server.
   
- **(Bonus) Host your API on a server:**
    - Choose a cloud platform (e.g., Google Cloud, AWS, Heroku, Vercel) and follow their instructions to deploy your Docker image.
    - Update your README.md with the public URL of your hosted API.