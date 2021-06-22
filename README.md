# zpi-front-end

Front-end of renting items app

# Installation

Install all needed dependencies by using:

```
npm ci
```

# Usage

To run application locally on your machine, use:

- `npm run start` - run application with locally running back-end
- `npm run start:local:docker` - run application with locally running dockerized back-end

**Application require files with local environments. Be sure, the files exists.**

## Environment variables

In local environment, the application use local variables, which are stored in specific files. Before run the application, you have to create and complete the files in `src/environments`. Directory must contains:

- .env
- .env.development.local
- .env.development.docker

### Env file template

```
REACT_APP_BACK_END_URL=""
```
