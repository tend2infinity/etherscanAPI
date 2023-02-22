# Instafam-backend
Instafam is a social media web application. These are the backend files for Instafam project made using Node.js and Express.js.
### 🔗 Live Demo
The hosted website can be found [here](https://instafam12.herokuapp.com/) 
### Frontend repository
Do check [this](https://github.com/tend2infinity/Instafam-frontend) out 
***
### Tech Stack and Concepts used:

<p align="left"> <a href="https://expressjs.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg" alt="express" height="40"/> </a> <a href="https://git-scm.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://heroku.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://img.icons8.com/color/48/000000/javascript.png"/> </a> <a href="https://www.mongodb.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg" alt="mongodb" width="50" height="50"/> </a> <a href="https://nodejs.org" target="_blank"> <img src="https://img.icons8.com/color/48/000000/nodejs.png"/> </a> <a href="https://postman.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> </p>


* __Backend:__ Nodejs, Expressjs, Jwt
* __Database:__ MongoDB
* __Deployment:__ Heroku
* __Tools:__ Git
***
## Database Design
We have used a NoSQL database(MongoDB) in which we are having two schemas **Post** and **User**. We have connected these two schemas at the relevant fields using (ObjectID).

## APIs
### Authentication
The authentication part of our app is done using JSON web tokens(JWT). Bcrypt package is used for hashing passwords. Every time during signup we store the hashed password in our User schema and everytime during login we generate a jwt token and store it in the localStorage. Then for accessing any protected API we send authorization header that includes the jwt token. We have implemented a middleware that checks whether the user is logged in or not by checking the authorization header, while accessing any protected API.

###  User APIs
These includes APIs ensuring following functionalities:
* __/user/:id__ To find a user with a particular ID
* __/follow__ To follow a particular user
* __/unfollow__ To unfollow a particular user
* __/updateprofilepic__ To update the profile picture of a user
* __/searchusers__ To search a user using a unique email

###  Post APIs
* __/allpost__ To retrieve all the posts from the Post schema
* __/allfollowpost__ To retrieve all the posts from those users which are followed by the logged in user.
* __/createpost__ To create a post with a title, body and a picture
* __/mypost__ To retrieve all the posts posted by logged in user
* __/like__ To like a paricular post
* __/dislike__ To dislike a post
* __/comment__ To comment upon a post
* __/deletepost/:postId__ To delete a post posted by logged in user
* __/deletecomment/:postId/:commentId__ To delete the comments posted by a logged in user

***

## Setting up the project
### Backend

1. Clone the repo

   ```sh
   git clone https://github.com/tend2infinity/Instafam-Backend
   ```
2. Install NPM packages

   ```sh
   npm install
   ```
3. Create a .env file using the template .env.template and add values accordingly.

### Usage

1.  Switch to the Backend folder and run the backend server

    ```sh 
    npm start 
    ```
