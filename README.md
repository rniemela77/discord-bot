# discord-bot

## Run locally

Run server locally

```
npm run dev
```

Run vue frontend locally

```
cd client && npm run dev
```

## Steps, Notes

- Created a discord bot using Node.js and Discord.js
- Created a few commands to interact with the bot
- Created a twillio account and added Node.js commands to send text messages
- Created discord bot commands to allow users to trigger twillio commands from discord. (!sendtext [number] [message])
- Using setInterval, allow users to schedule text messages to be sent at a specific time. (!sendtext [number] [time] [message])
- Created a web server (Node+Express)
- Created a basic Vue frontend (no functionality yet)
- Host the frontend + server on Heroku
- Get and display the server "database" on the frontend
- Get and display the server "database" on discord
- Allow discord bot to modify the server "database", and have frontend display the changes
- Allow creating tasks on frontend
- Added deploy script
- Added discord webhook. Whenever a push is made to /api/tasks, discord bot will send a message to the webhook.
- Created basic authentication for the web server.
- Created a function that notifies the discord bot when a task is due.
- Allow users to complete tasks
- Allow users to delete tasks
- Only fetch tasks that are created by the user
- Fetch tasks that the user is "watching"
- Allow users to select other users as task watchers
- Allow users to create accounts

## TODO:

- frontend: add way for watchers to send feedback once task creator has completed the task
- frontend/server: add username to URL paths.
- frontend: use base components for inputs (textarea, text, checkbox, radio...)
- frontend: disallow users from viewing tasks that aren't theirs. (use nav guard script)
- server: send specific task URL to user when due
- frontend/server: allow users to upload/set avatar
- frontend: when an API request is made that will be reflected in the UI (creating a task for instance), consider directly changing the store/state to create a snappier experience. Figure out how to handle the API failures.
- frontend: Simplify/improve the UI
- frontend: develop profile screen. (What to add?)
- server: Set up MongoDB
- server: export/import functions the same everywhere. (exports.module?)
- server: Re-enable twillio, place in Twillio folder
- heroku: add SITE_URL=... to heroku secret keys
- build: Determine if I need to keep Procfile
- server: Look into cron jobs for deadlines/scheduling
- server/frontend: Split tasks into "current", "past", "deleted"...
- frontend: add screen that shows main tasks for all users. show users avatar, progress, etc.
- frontend: add session/cookie storage, make user not have to login
- heroku: add deploy/build scripts
- build:Use package like Concurrently to create a npm dev script
- consider using gzip. app.use(compression()) is a good idea
- frontend: fix title/description
- frontend: add a favicon

## Future plans

- Mobile push notifications, web push notifications?
- Daily morning check-in with discord channel
- Set weekly and daily goals. Maybe do global messages for weekly goals, so it doesn't spam the channel.
- Allow users to rate how difficult a goal might be, then ask to rate how rewarding it actually was.
- Notify user to set an intention each morning. "I want to be more X today". Maybe create a prompt/template for them to set an intention. Write 5 things that they would do if they were 5% more X today. (4 pillars of self esteem)
