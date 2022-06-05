# discord-bot

## How to use

To run the server locally

```
npm run dev
```

To run the client locally

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

## TODO:

- Move axios functions to a separate file
- Communicate to discord when a row is created
- Figure out how to have the frontend "listen" for changes to the database without sending new get requests every x seconds
- Have dev script to concurrently run the server and the frontend
- Set up MongoDB
- Re-enable twillio commands
- Separate out the twillio commands into a separate file
- Determine if I need to keep Procfile
- Handle API fail errors on the backend, frontend and discord.
- Make vue build on deploy
