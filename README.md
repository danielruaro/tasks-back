# Tasks Backend


### Installing

A step by step series of examples that tell you how to get running

Clone this repository

Backend
```
cd tasks-back
yarn
```

You need to create a Postgres database you can also use docker.

Configure the database file at src/config/database.js and the auth secret keyt at src/config/auth.js

After that

```
sequelize db:migrate
yarn start
```

Now, you need to run the frontend, *[Click here to access frontend repository](https://github.com/danielruaro/tasks-front)

# Backend 
* [Express](https://expressjs.com/) - To build HTTP server
* [JSONWEBTOKEN](https://github.com/auth0/node-jsonwebtoken) - JSON Web Token implementation
* [Sequelize](https://sequelize.org/v5/) - Sequelize is a promise-based Node.js ORM
* [date-fns](https://github.com/date-fns/date-fns) - date-fns provides the most comprehensive, yet simple and consistent toolset for manipulating JavaScript dates in a browser & Node.js.
