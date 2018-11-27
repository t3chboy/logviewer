<meta name="google-site-verification" content="_hDGY6PDNuKGOaS9PtiK2EvJR9aRBsJeabwr8n2FzWM" />

# logviewer
View remote log files and get updates from them like running tail -f command and also save them to MongoDB in runtime.

![NodeJS](https://img.shields.io/badge/Powered%20by-NODEJS-brightgreen.svg?longCache=true&style=for-the-badge)
[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)]()
[![Open Source Love svg3](https://badges.frapsoft.com/os/v3/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

<meta name="google-site-verification" content="_hDGY6PDNuKGOaS9PtiK2EvJR9aRBsJeabwr8n2FzWM" />


Log viewer is nodejs and socket.io based application which can be used to view log files stored on remote host.
You can also store logs at runtime in Mongo DB.
Initially it reads and shows last 1 mb of specified file and later streams data to client on any changes which occurs at eof.

  - Provide absolute file path
  - Provide valid MongoDB credentials



# Tech stack 
logviewer is build on following stack

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework
* [socket.io] - exchange message via sockets.


### Installation

requires 
[Node.js](https://nodejs.org/) v4+
[socket.io](https://socket.io) v2.0
[mongoose](https://mongoosejs.com/) v5.0+
[express js](https://expressjs.com/) v4.16+

## How to Use

* ### Server side
```sh
 Browse to the applicatin folder
 $ npm start
```

* ### Client Side

```sh
In Browser specify url of the hostname where app is running with port 3000
eg : http://localhost:3000
```

###### Things to watch out !!!!
[How socket io works](https://davidwalsh.name/websocket)


[web socket vs socket.io](https://stackoverflow.com/questions/10112178/differences-between-socket-io-and-websockets)

Everytime page RELOADS new socket session gets created disconecting the old.
Mongo DB collections get created based on socket session id for each user, so if page realoads you collection will change based on your new session and old collection being unaffected anymore.
