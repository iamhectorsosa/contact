# Start Building with the Notion API

[Notion](https://www.notion.so/) is easily one of the most influential productivity tools introduced over the last few years. It provides a single workspace for every team. More than a document or a table, it lets you customize your workspace in a way it works for you.

As of March this year, the [Notion API](https://developers.notion.com/) is official out of beta, so let's go ahead and try it out by creating 'Contact Us' page. 

We'll be using [React](https://reactjs.org/), [Next.js](https://nextjs.org/), [Chakra](https://chakra-ui.com/) and [Notion](https://developers.notion.com/) (as our database). We will not be integrating authentication for this project, purposefully so to remove friction and to allow anyone to send a 'Contact Us' message.

Here's how to get our project started:

```bash
# React Typescript Next.js
$ npx create-next-app@latest --typescript
# Chakra UI
$ npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6
# Notion SDK for JavaScript
$ npm i @notionhq/client
# React Icons
$ npm i react-icons --save
```

