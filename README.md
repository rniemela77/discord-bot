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
- Get and display the server "database" on the frontend
- Get and display the server "database" on discord
- Allow discord bot to modify the server "database", and have frontend display the changes

## TODO:

- Make a way for the frontend to create "rows" on the database
- Communicate to discord when a row is created
- Set up MongoDB
- Re-enable twillio commands
- Separate out the twillio commands into a separate file
- Determine if I need to keep Procfile
- Handle API fail errors on the backend, frontend and discord.
