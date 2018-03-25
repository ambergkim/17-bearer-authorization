# 401 Lab 17 Bearer Authorization. Amber Kim

## Introduction
This is a simple node.js app with an Express Server that implements Restful API's, uses MongoDB with Mongoose for storage. It also uses Basic Authorization using the NPM package, bcrypt and Bearer Authorization using the npm package, jsonwebtoken.

## Technologies & Practices
* Node.js
* Express
* MongoDB
* Mongoose
* BCrypt
* JSONWebToken
* Restful APIs
* body-parser
* Optional Jest for testing

## To Run This Application
Make sure you have your Mongo Daemon running.

Install all the dependencies as listed in the package.json. For a quick install run these commands in the lab-amber folder:
```
npm install -y
npm install
```

Run server.js. Some example tools and commands you can use:
```
node server.js
// for node

nodemon server.js
// if you have nodemon installed globally
```

RECOMMENDED: Test this app by using an http client like Postman. The built-in tests are written for Jest.

## Mongoose Schema
There are two schemas

### User Schema
It takes these keys:
* username which is a String
* email which is a String
* password which is also a string
```
{
  username: {type: String},
  email: {type: String},
  password: String
}
```

### Post Schema
It takes these keys:
* userId which takes the userId of an existing user
* date which takes in a Date is not required and will have Date.now as a default
* content which takes a string
```
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  },
  content: String
}
```

## API End Points
### Resource 1: Users
#### For Signing Up:
This is to create a new user with a POST request.

The URL:
```
http://localhost:3000/api/signup
```
The request body:
```
{
	"username": "hello",
	"email": "email",
	"password": "world"
}
```

#### For Signing In:
For signing in an existing user with a GET request.

The URL
```
http://localhost:3000/api/sigin
```

Choose a Basic Auth. Enter your username and password in Postman.

This will return an object that includes the token you will need for making resource requests.

```
{
    "signedIn": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxvIiwiaWF0IjoxNTIxOTM2MTU0fQ.0ufeUVKVTRcpepiBZCzNP2BXv5dt1jxSwE-H_QZK1-w"
}
```


### Resource 2: Posts
Make sure to set your header to use Bearer Auth and input the correct token from your signin

#### For GETting all the posts

The URL:
```
http://localhost:3000/api/posts
```

This will return all of the posts.

### For GETting one post 

The URL:
```
http://localhost:3000/api/posts?id=<a valid post id>
```

### For POSTing a new post

The URL:
```
http://localhost:3000/api/posts
```

Your request body:
```
{
	"userId": <existing user id>,
	"content": <new String content>
}
```

#### For PUT requests to update a resource post
The URL:
```
http://localhost:3000/api/posts?id=<valid post id>
```
and send proper JSON in the request body:
```
{
	"content": <updated content String>
}
```

#### For DELETE requests to remove a specific post:
The URL:
```
http://localhost:3000/api/posts?id=<valid post id>
```

Will return a status of 204 No Content.

## Special Thanks
* [JB Tellez](https://github.com/jb-tellez) for mongone.js found in the /lib folder.
* Thank you to [emailregex.com](http://emailregex.com/) for the email validator.