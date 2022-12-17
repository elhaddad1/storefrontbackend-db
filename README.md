
# Storefront Backend

In the project for this course, you will create an API with Node and Postgres that will support an online store front end. This API will do the following:

Allow products to be created and stored in a database
Allow users to sign up and sign in

Require users to be signed in to perform certain actions

Allow users to create orders and add products to orders



## Authors

- [@elhadad](https://github.com/elhaddad1)


## Installation Instructions
Please make sure that `postgres` is installed on your local system and the server is running.
### Dev mode
To install the app's dependencies and use the app in dev mode, run the following: 

configure .env file with the required variables (mentioned below).

`npm run reset-dev-db` runs a script that uses db-migrate to reset tabels on dev database.

To run the app in dev mode execute `yarn start`.
### Test mode
To install the app's dependencies and use the app in test mode, run the following:

`npm run test`


### Ports
The application runs on port `3000` with database on `5432`.



## Install All Packages

```bash
  npm install
```

## Run build Command 
```bash
  npm run build
```
## Start application
    
```bash
  npm run start
```
Start application for the first time
    
```bash
  npm run start-first-time
```


## Running Linting

To run tests, run the following command

```bash
  npm run lint
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Usage/Examples

Server URL

```URL
http://localhost:3000

```

### Environment variables 
The following environment variable are needed.
```
POSTGRES_HOST="localhost"
DEV_POSTGRES_DB="store_db"
TEST_POSTGRES_DB="store_db_test"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="P@ssw0rd"
NODE_ENV="dev"
TOKEN_SECRET="jllgshllWEUJHGHYJkjsfjds90"
```