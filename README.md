# Torrent Report

A source for time series reports on the top and new torrent files.

Every 24 hours our site begins scraping the top torrents from a series of torrent sites. We identify unique torrents and store the count of seeders and leechers for every torrent.



## ___This project is an active work in progress___



## Frontend

- React 16
- Redux
- React router
- Web Workers
- Axios
- _**New Addition!**_ Styled-Components
- _**Formerly**_ SASS with post-css

## Backend

Using Node.js with express, sequelize, postgres, and puppeteer (the headless chrome utility) in our scraping. we can have our application serve up database queries and perform our information gathering.

#### Technologies & Frameworks

- Server: Express, body-parser
- Persistance: GraphQL _planned_ , Sequelize, Postgres
- Authentication: Passport, Passport-Google
- Testing: Mocha, Chai

### Information Gathering (aka reporterAgent)

The central figure in this show is the reporterAgent (./server/reporterAgent), a custom built tool using puppeteer to scrape data from a wide varierty torrent websites. It runs as a scheduled service that fetches each torrent sites content independently and retries any sites that are down.

## Front End

Built using React 16 with redux, redux-thunks, and without any front-end css frameworks (custom flexbox). The application has been optimized for two screen sizes. anything less than 800 pixels wide is considered a condensed "mobile" view. Using SASS (mixins and variables),

The application currently utilizes a RESTful api, but I am rewriting it using GraphQL. This will allow me to utilize Relay with React and greatly simplify the data-fetching.

# SETUP

## Development

1.  Copy or clone this git repository.
2.  Run `npm install` or `yarn`.
3.  install PostgreSQL and Redis. Launch them both or the application will crach.
4.  Fill in the enviroment variables bellow and save it as `.env` in the root project directory:

```env
REDIS_URL=redis://localhost:6379
DATABASE_URL=postgres://localhost:5432/TorrentReport
EMAIL_HOST=
EMAIL_PASS=
EMAIL_PORT=
EMAIL_SEC=true
EMAIL_USER=
ADMIN_EMAIL=
GOOGLE_CALLBACK=/auth/google/callback
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NODE_ENV=development
SESSION_SECRET=
```

`EMAIL_HOST` is the SMTP domain of your provider.

`EMAIL_PASS` is your passowrd to be used with the email provider.

`EMAIL_USER` is your email to be used with the email provider.

`ADMIN_EMAIL` is the email which will be notified of errors and from where site emails will be sent.

5.  The scrape service runs on a schedule, but will not run more than once every 12 hours on its own. If you are just installing this project and want to have some data to play with run `npm run start-scrape` or `yarn start-scrape`.

6.  To launch the project run `npm run start-dev` or `yarn start-dev` and navigate to http://localhost:8080. **NOTE** You can set an enviroment variable `PORT=` for any port number and use that port. I have omitted it as it defaults to port 8080.
