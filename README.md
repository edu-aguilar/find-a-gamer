# Udacity Capstone Project
## Find a gamer 

### App context
Find a gamer is a web application based on a frontend app built with Vue and a backend REST API built with serverless using a nodeJS 12 environment. 

The idea of this application is give to users, commonly gamers, the capability of search people who wants to play together. You can choose your game, set the interval time that you are going to play and create your event to let people ask you to play together using the comments area.

When you access to application, you can see the latest published events and the detail of them. However, if you want to create your own event or add comments to other users events, you have to sign up / log in to the app.

After successful login, you can create your events and edit them attaching a new image if you want to do it.

### Project Set up
At this repo there are both layers, backend and frontend. The backend is already deployed at amazon. To run the application, type the following commands:

```sh
$ cd frontend
$ npm i
$ npm run serve
```

And the app will be ready at http://localhost:8080/

### About backend
If you want to check all available REST API endpoints, there is a postman collection in the repo. Pay attention that some endpoints are privates, so you should use the frontend app, log in, and the jwt is printed to console.

Enjoy!!


### App pics
#### Home
![Imgur](https://i.imgur.com/7iDF4vm.png)
#### Event detail
![Imgur](https://i.imgur.com/RqcJfQl.png)
#### Event edit
![Imgur](https://i.imgur.com/teXYQmD.png)
#### Other links
![Imgur](https://i.imgur.com/tItmyko.png)