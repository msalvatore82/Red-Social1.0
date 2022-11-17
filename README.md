## About This proyect!

### Hey 👋 Developer 👇
 [Matias](https://github.com/msalvatore82) 🧑‍🦲


### About the project:
In the backend project we will combine the node + express technologies, in addition to moongose/Mongodb and Javascript development.

# 📋 Pre requirements

1 - In order to start the project first make a clone:

> git clone:  https://github.com/msalvatore82/Red-Social1.0.git

2 - Once the project is cloned, you must install the necessary modules with npm:
> npm install

3 - module
> install express

4 - module
> install moongoose

5 - module
> install Bcrypt

6 - module
> install dotenv

7 - module
> install nodemailer

8 - You should rename the ".env.example.json" file to ".env.json" 
in the .env file set your credentials
> MONGO_URI
> nodemailer
> JWT_SECRET
> PORT

9 - You should rename the "config-example.json" file to "config.json" 
> Then edit the "MONGO_URI" fields with your "name", "password", "db name" and "secret word".

10 - The project is ready to start
> npm start

## Requirements:
- User registration using Bcrypt.
- User login + token + middleware.
- Give/remove Like a post.
- Give/remove Like to Comments.
- followed and unfollowers
- Backend available in production.
- CRUD of the endpoints.
- Deploy in VERCEL 
- Nodemailer: Email confirmation on login.

### Endpoints
#### User 🙋‍♂️​🙋​🙋‍♀️​
- CRUD products
- Endpoint to create a User.
- Endpoint to update a User.
- Endpoint to remove a User.
- Endpoint that returns the information of the connected user, in addition to bringing us the posts and the number of  followers they have.
- Filter to search product by name.
- Filter to search User by name.
- Filter that orders the products from highest to lowest price.
- Implement validation when creating a product so that all fields are filled in and if not, a message is returned.
- You will only be able to create, update and delete products if you are authenticated.

#### Post 📬​
- CRUD Categories
- Endpoint to create a post (authenticated),(option to upload image, (Middleware Multer))
- Endpoint to update a post (authenticated).
- Endpoint to delete a post (authenticated).
- Endpoint to bring all the posts together with the users who made that post and together with the comments of the post.
- Endpoint to search post by name.
- Endpoint to search post by id.
- Validation when creating a post so that all the fields are filled in (except the image, which is not required) and if it is not done, it returns a message.
- Endpoint to search all post whit pagination of 🔟​ in 🔟​ 📄​.


#### Comment 📝​
- Endpoint to create a comment on a specific post (option to upload image, (Middleware Multer))
- Endpoint to remove comment.
- Endpoint to like a comment.
- Endpoint to remove like.
- Endpoint with MULTER implementation to upload images to the comments.
- Endopoint to remove comment.
- Endpoint to search all comment whit pagination of 🔟​ in 🔟​ 📄​.

#### Likes ❤️​👌​👍​
- Endpoint to like a post
- Endpoint to remove as a post
- Endpoint to like a comment
- Endpoint to remove as a comment


#### Middleware:
- Authentication.
- Error.
- Multer.

### Languages and Tools:
<p align="center">
  <img align="center" height="30" width="50" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg">
  <img align="center"  height="30" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg">
  <img align="center"  height="30" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg">
  <img align="center" height="30" width="30" src="https://cdn.svgporn.com/logos/visual-studio-code.svg">
  <img align="center"  height="30" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg">
  <img align="center"  height="50" width="50" src="https://avatars.githubusercontent.com/u/7552965?s=400&v=4.svg">
  <img align="center" height="30" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg">
  <img align="center"  height="40" width="40" src="https://cdn.worldvectorlogo.com/logos/postman.svg">

  <img align="center" height="30" width="30" src="https://p.kindpng.com/picc/s/385-3850482_mongodb-logo-png-transparent-png.png">

 <img align="center"  height="30" width="30" src="https://raw.githubusercontent.com/andris9/Nodemailer/master/assets/nm_logo_200x136.png">

  <img align="center" height="30" width="30" src="https://img.stackshare.io/package/19054/default_2be036aaca5c71baf790e00f1ef80dd37a625905.png">
  
   <img align="center" height="30" width="30" src="https://avatars2.githubusercontent.com/u/7658037?v=3&s=400">
      </p> 




