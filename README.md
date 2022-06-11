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

## TODO:

- Only show user tasks they created on the frontend
- Store tasks in tasks.js on the frontend
- allow users to add users to their task list
- Clean up front end. Possibly make radio buttons instead of a dropdown.
- Make sure errors are handled properly for all requests
- Set up MongoDB
- Re-enable twillio commands
- Split tasks into multiple collections. AllTasks, UnfinishedTasks, FinishedTasks. Only show unfinished tasks in frontend, and only iterate on that collection to see if a user should be notified.
- Separate out the twillio commands into a separate file
- Determine if I need to keep Procfile
- Make heroku run deploy script
- Use package like Concurrently to create a npm dev script
- consider using gzip. app.use(compression()) is a good idea
