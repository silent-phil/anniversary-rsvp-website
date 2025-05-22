# Anniversary Invite Website

This project started originally as a registration page for my family's anniverary.
For this public repo all private assets were removed and replaced by generic ones.

### Live Demo

https://miaundtom-demo.deno.dev
Feel free to submit test-data and/or Login using "demo" Admin credentials

### Conig

The project requireds a environment variables

Variable | Recommended Value | Description
--- | --- | ---
SESSION_LIFETIME | 3600 | Session lifetime in seconds once a user has registered
SESSION_KEY | 1Dr0dh2kuzw**** | a token that is used to encrypt session cookies (secret!)
ADMIN_USER | admin | Admin username
ADMIN_PASSWORD | *** | Admin password
ADMIN_SESSION_TIMEOUT | 900 | Admin session timeout in seconds
LOGIN_ATTEMPTS_TIMEOUT | 900 | Admin Login attempts timeout in seconds
LOGIN_ATTEMPTS_COUNT | 5 | How many login attempts can be made within the timeout window
SMTP_SERVER |  | SMTP server for sending email by SMPT
SMTP_USER |  | SMTP username for sending email by SMPT
SMTP_PASSWORD |  | SMTP password for sending email by SMPT
MAILERSEND_EMAIL | thanks@mydomain.ch | From Email address when sending emails in Mailersend
MAILERSEND_API_TOKEN | *** | API token for sending emails with Mailersend
EMAIL_ENABLED | true | Whether sending confirmation emails to registered users is enabled or not


### Tech

This project was built with fresh.js and deno.
As database solution deno KV is used and part of deno deploy for hosting the website

Learn more on these fascinating technologies:

- https://deno.com
- https://fresh.deno.dev/
- https://deno.com/deploy 
- https://deno.com/kv


### How to use

This project is not (yet) 100% ready to use withouth some own customizations to the code.

1) Install deno from https://deno.com/
2) Start by cloning this repository
3) Create a .env-file in root folder with your own values as desired (see config)
4) Go to "components/sections" and write your own text directly into each TSX file
5) Optionally, you may want to also update some files in "components/islands"
6) Use "deno task start" command to build & run the project locally
