# Anniversary Invite Website

This project started originally as a registration page for my family's anniverary.
For this public repo all private assets/texts were removed and replaced by generic ones.

The page features:
- A registration form, where users can register to the event
- Sending confirmation emails to users
- A admin-login (bottom) wheer you can see aditional data and control few settings

### Live Demo

https://miaundtom-demo.deno.dev

Feel free to submit test-data and/or login using "demo" Admin credentials
Note: Sending Email is disabled in this demo mode!

### Configs

The project reqiures teh followin environment variables:

Variable | Recommended Value | Description
--- | --- | ---
SESSION_LIFETIME | 3600 | Session lifetime in seconds once a user has registered
SESSION_KEY | 1Dr0dh2kuzw**** | a token that is used to encrypt session cookies (secret!)
ADMIN_USER | admin | Admin username
ADMIN_PASSWORD | *** | Admin password
ADMIN_SESSION_TIMEOUT | 900 | Admin session timeout in seconds
LOGIN_ATTEMPTS_TIMEOUT | 900 | Admin Login attempts timeout in seconds
LOGIN_ATTEMPTS_COUNT | 5 | How many login attempts can be made within the timeout window
MAILERSEND_EMAIL | thanks@mydomain.ch | From Email address when sending emails in Mailersend
MAILERSEND_API_TOKEN | *** | API token for sending emails with Mailersend
EMAIL_ENABLED | true | Whether sending confirmation emails to registered users is enabled or not


### Tech

This project was built with fresh.js and deno.
As database solution deno KV is used, which is part of deno deploy - their own cloud solution

Learn more on these fascinating technologies:

- https://deno.com
- https://fresh.deno.dev/
- https://deno.com/deploy 
- https://deno.com/kv


### Getting started

This project is not (yet) 100% ready to use out-of-the-box, withouth any coding understanding.
Page content (text and images) are directly inside the project and you would need swap assets and texts to your needs.

Follow these steps to get started:

1) Install deno from https://docs.deno.com/runtime/ (no worries, it is way quicker/easier than node.js!)
2) Start by cloning this repository to you local machine
3) Create a new .env-file in root folder and populate all variables as seen in above config section.
4) Use "deno task start" command to build & run the project locally

Note: Yes, deno does not require you to "install" any dependencies first, all is done on the first initial app run.

Now, you may want to change assets or texts to you need.
Please have a look in the following locations:

* components/section -> contains the individual websites sections and their text content
* islands -> contains the interactive components of the website
* static/images -> contains the images
* routes/index.tsx -> this is the main page structure (no need to change)