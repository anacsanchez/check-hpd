# Check HPD

Enter an address to check the NYC HPD API for violation and complaint information.

* Built with React.js and Express
* Uses HMR middleware for development


## Instructions
---

1\. Obtain an API Token by registering for a Socrata account:

https://support.socrata.com/hc/en-us/articles/210138558-Generating-an-App-Token

2\. Create a .env file in the root project directory and add your API Token like so:

```
API_TOKEN=YOUR_API_TOKEN_HERE
```

3\. You can run the app via your CLI or Docker.

**CLI** - enter:
```
npm install
npm run start
```
---
**Docker** - In your CLI, enter:

```
docker-compose up -d --build
```

You can close the app by entering
```
docker-compose down
```

---
4\. The app will be running on http://localhost:3050 .


## Development
---

You can start the app in development mode via your CLI or Docker.

**CLI** - In your .env file, add:

```
NODE_ENV=development
```
Then enter
```
npm run start
```
---
**Docker** - enter:
```
docker-compose -f docker-compose-dev.yml up -d --build
```

To stop the application, enter:
```
docker-compose down
```

---
The app will be running on http://localhost:3050 .

## Updating node_modules in Docker Development
To update the node modules without rebuilding the app, start the docker container and in your CLI enter:
```
docker exec check-hpd npm install
```
