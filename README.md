# logviewer
File log files remotely acting as tail -f command and also save them to Mongo in runtime.

# LogViewer
Powered by [![Powered by](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAdCAYAAADsMO9vAAAFCUlEQVRYhe2XbWwURRzGRyoFAUUMTQWbcMba87je7vxni32/27uWtkehxcjykrbH7rY3u0WJGhMjEWPDi6W8loPS3t3utlW+eII2isEQ30IgGqMxijEEoyHRT4QPoiRoAq4fvMN12fMKBg4Tn0+b2f8+8/x2ZmdmEcqjOI6bLQhCQT4z/CthjJ8AgK8ZhmnJd5YbEiHkSY7jTI7jTEJIIt95rls2gM/ynee69T9AvnVTAHw+3xxCyCDG+DTLsitz1Xv7vPctG+GPLtkfOOvfVO3LVV9WVvYAAIwTQoYA4OVcAAzDVALAR4SQPRzHzc5qLAhCAcZ4HQCcz5imjY8zDEOuqU8JBa1xfkvX4cbLXYeazJWvNpptwyGzeQ9/pK6/bo693uVyTQeAFwkhF63+2QDcbvd8AHiFEPK7peYcIYQihKb8zZwQwmGMTzkZpx+8AgA6QmgaQgiF9tSEIm80XlCOtZjdR5rNrkNN5qqDjWZ7PGS2J0JmeyJ4uWlX/YaMP8a4nRByNpu/HYDjuOcJIb9kqwWAL8rLyyuuArAsu9Me2KlDhmHcfwJUvaUcazHtAI9pDWbrUMhcnmwwW/b6f834A8APtgCXAOCyE0BxcfFMB7hzhJArtrZR6wjssJh/X15eziCEpmCMn7I+xLJsGUII8XsrJx4/yDsChGNBs3UoaPq31l60+P9o6fiox+NZwLKslxDysR2gqKholi3o9shgx9KGNXwLxvi0pb0vG8CEZSjnOgHUD1dMhA5UmvLbzY4ADTv9ZqDfGQAAVlim1tO5AMI03NQ72m0qmngUADRCyBmGYZbZv4HtkwHweDwPI4RQfRIm+Fi12TYScgQIDQRMf391thF4xjK1duUCWFS1aJWiSRupHgl6vd6FCKFCZNf1AtSO+t4JbvObwf6A2Zla7AwwUPubE0CmD4zxh07fgB0gfe81j8ez4JrglqEcSBdexBiLFoCpGOMjGSOv11uKEEL+MXZjBiC8N+gMsKPuS8ubfv2fVqA0VAyhq8v5MYf7lwBgc3Fx8UwngC0AMO52u+c7ATIM00II+YZhmAczbdWph0oDBypOBfsD5oqxxqsAi/fVXAjEKtbYPTiOW44x/s4h2FcMw4QcMrUTQr51qN/slPGOrMOTo6Z2zNsWilX93D5ef6VhlBtE6U1GHBLup4a0m2rSWvTXxjMts8YDwHmM8bocPzSFAPAsx3E/AcBJn89XPYmcN6QpRamiWQghFF4fnqYa0nOqIb3fkxR5RZM2pK+rMsWlpaVFLpfr3smal5SU3HUzQl+jaEJaqhrScVUXRWTZ7uV9q+erhjim6PJ4Z7xzXk+so4TGO3Kem26pxOHVLkWT3+uIhe+hcTqDxulcGqczqB4Jdmtra2mcTo0mpBqqyW9GE1JzVF+b86B4S0Xj9BFFF/cjhFBvItKo6nKfqoknVEN6odeQtymGeJjn+TtVQ3pXSAkFwu7qWzMtJisnAMWQP1cMabB3rIcqSWlVBiDfWR3lALA1mpCaaTxSpyQlSTXkM/JA293/JYBNqiaeUHWxX9XlrdSQTqZXqNsToDPeOU8x5E/kA53unqS4hOriS0JKKJRHuiq6tcijfB8/XUlKkqLL4/nOmlXSSMdCxRAPU0P6NJoQF2XaowmphuryB4ombeD7+On5zDgp0TidqujyqKKL61VdPqga4pi8b7XjMeW2lZASCqkm9dB4V+XN7OcPhqH5lINbL9QAAAAASUVORK5CYII=)]()




Log viewer is nodejs and socket.io based application which can be used to view log files stored on remote host.
You can also store logs at runtime in Mongo DB.

  - Provide absolute file path
  - Provide valid MongoDB credentials



# Tech stack 
logviewer is build on following stack

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework
* [socket.io] - exchange message via sockets.


And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

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
In Browser and specify the hostname where app is running and listen on port 3000
eg : http://localhost:300
```

###### Things to watch out !!!!
[why socket io is not real websockets based ocnnection](https://davidwalsh.name/websocket)


[web socket vs socket.io](https://stackoverflow.com/questions/10112178/differences-between-socket-io-and-websockets)

