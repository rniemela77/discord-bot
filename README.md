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

## TODO:

- Put secret keys in a .env file, which doesn't push to git, to allow for local development
- Develop Vue frontend
- Re-enable twillio commands
- Separate out the twillio commands into a separate file
- Create a faux database to store the users and their scheduled messages. Use this until MongoDB is set up
- Set up MongoDB
