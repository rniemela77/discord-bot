# discord-bot

## Steps, Notes

- Created a discord bot using Node.js and Discord.js
- Created a few commands to interact with the bot
- Created a twillio account and added Node.js commands to send text messages
- Created discord bot commands to allow users to trigger twillio commands from discord. (!sendtext [number] [message])
- Using setInterval, allow users to schedule text messages to be sent at a specific time. (!sendtext [number] [time] [message])
- Created a web server (Node+Express)
- Created a basic Vue frontend (no functionality yet)
- Host the frontend + server on Heroku
- Display the server "database" on the frontend

## TODO:

- Create a faux database on the server. Use this until MongoDB is set up
- Allow adding to the "database" with the bot
- Set up MongoDB
- Re-enable twillio commands
- Separate out the twillio commands into a separate file
