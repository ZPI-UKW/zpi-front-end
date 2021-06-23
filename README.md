# zpi-front-end

Front-end of renting items app

# Installation

Install all needed dependencies by using:

```
npm ci
```

`package.json` contains `fsevents` dependency, which is required only on macOS. If you use other operating systems, use the following command instead:

```
npm ci --no-optional
```

# Usage

To run the application locally on your machine, use:

- `npm run start` - run application with locally running back-end

**Application requires files with local environments. Be sure, the files exist.**

## Environment variables

In a local environment, the application uses local variables, which are stored in specific files. Before running the application, you have to create and complete the files in `src/environments`. The directory must contain:

- .env
- .env.development.local

### Env file template

```
REACT_APP_BACK_END_URL=""
```
