# NodeJS Express Starter Pack

This is a simple starter pack project with NodeJS & Express. There are several libraries includes in this project as default :

- jest
- supertest
- joi
- cors
- dotenv

## Folder structure
```sh
 .
├──  src
│   ├──  applications
│   │   ├──  database.js
│   │   └──  web.js
│   ├──  controllers
│   ├──  middleware
│   │   └──  error.middleware.js
│   ├──  models
│   ├──  responses
│   │   ├──  error.response.js
│   │   └──  success.response.js
│   ├──  routes
│   ├──  validations
│   │   └──  validation.js
│   └──  server.js
├──  test
│   ├──  feature
│   │   └──  welcome.test.js
│   └──  unit
├──  babel.config.json
├──  package-lock.json
├──  package.json
└──  README.md
```

## Installation

Install required packages.
```sh
npm install
```

Create a new .env file and edit the credentials there.
```sh
cp .env.example .env
```

## Testing
You can try it by running the unit tests or testing manually using postman.
```sh
npx jest
```

Run your app.
If you already have nodemon installed you can run this.
```sh
npm start
```

Or if not, you can run this.
```sh
node src/server.js
```

That's it.