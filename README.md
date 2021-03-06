# discord-bot

## Run locally

Run server locally

```
npm run dev-server
```

Run vue frontend locally

```
npm run dev-client
```

## Deploying

```
cd client && npm run build
```

Push to production branch on github
ensure dynos are enabled

## TODO:

- process: add lucidchart of how everything works

- frontend/server: on each new day, allow user to write how todays tasks will help them achieve GOAL(s) when they attempt to save/edit/add plan.
- frontend: set FormTemplate to all forms.
- frontend: give FormTemplate a prop, "statusMessage", which will show the result/error text. (catch(err) will be shown here. maybe have generic success message?)

- frontend: show date next to most recent watched tasks. (Is this task for today, yesterday, etc?)
- frontend: send generic watcher message if not provided a message
- server: abstract some logic into other functions. remove the amount of code in the HTTP route handlers.
- frontend: add form status to all areas with buttons. (initial, loading, sending, success, error)
- frontend: form status 'sending' should disable buttons and inputs
- frontend: show 'success' message/state briefly
- frontend: communicate success on API calls
- frontend: communicate error on API calls
- frontend: allow user to view their own plan on one tab, and watched plans on another tab.
- frontend: move more logic into store functions. (import each store into the other stores if possible)

- frontend/server: create custom select inputs for reminders. this way I can make sure the user only gets reminders in steps of 15/30 min.
- frontend: make task times v-for, use checkboxinput base component.

- frontend/server: have user fill out password when they edit profile. (this way we can pass password in the PUT request, and we don't store the password on the client, or return the password in the PUT request response).
- frontend: use formStatus, grey out fields when form is submitting. grey out Save button if fields haven't changed.

- frontend: add common keywords for quickly setting task name. "meal prep", "exercise", "study", "meditate"... (this can pop up as a tooltip selector when the user focuses in on the input field for the name)
- frontend: add page transitions
- frontend: use base components for inputs (form, textarea, text, checkbox, radio...)
- frontend/server: develop profile screen. allow users to upload/set avatar
- server: Set up MongoDB
- server: Re-enable twillio, place in Twillio folder
- build: Determine if I need to keep Procfile
- frontend: show users avatars
- frontend: allow light/dark mode. allow user to even choose specific color they prefer? add to sessionstore/cookie
- frontend: allow users to create plan for next day. create tabs ('yesterday', 'today', 'tomorrow')
- frontend: add session/cookie storage, make user not have to login
- heroku: add deploy/build scripts
- frontend: fix title/description
- frontend: add a favicon

## Future plans

- Mobile push notifications, web push notifications?
- Daily morning check-in with discord channel
- Set weekly and daily goals. Maybe do global messages for weekly goals, so it doesn't spam the channel.
- Allow users to rate how difficult a goal might be, then ask to rate how rewarding it actually was.
- Notify user to set an intention each morning. "I want to be more X today". Maybe create a prompt/template for them to set an intention. Write 5 things that they would do if they were 5% more X today. (4 pillars of self esteem)
- Add daily motivational message. Allow users to send their own motivational messages. Share users 'stories'? (how their tasks will help them achieve their goals)
- Add some measurements on progress goals. averages, etc
- Consider using gzip. app.use(compression()) is a good idea
- Use package like Concurrently to create a npm dev script
- Look into cron jobs for deadlines/scheduling
- Allow each task to have 'priority' level. low, medium, high
- Show statistics for common goals. like, who else has 'meditate' for their goal today. Or, day streaks.
