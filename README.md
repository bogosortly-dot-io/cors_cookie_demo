This repo contains a very simple project to demo basic cors settings to provide functional cookie use across two origins (API server and FE server) 

FE provides: 
- one button that will hit an endpoint which will set the users cookie
- another button which hits an endpoint that will verify that the cookie was included on the request


start API server 

```
cd server
npm install
npm run start
```

start FE server 

```
cd my-react-app
npm install
npm run dev
```
