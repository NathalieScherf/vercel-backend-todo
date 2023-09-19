# A backend for the to do app

In this project you will create an express backend for the Todo app. 


#### User stories:
As a user, I can

- read a list of tasks. (GET)
- delete any task (DELETE)
- add a task (POST)
- edit any task (UPDATE)
- mark any task as completed (UPDATE)


When this backend project is done, and connected to a data base, we will use this project to send requests from our front end To Do App. 

[Here](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning) you can see a front end version of the app. 


### Generall considerations; 

- Create a set of mock data to use
- Which paths do you need?
- Which methods do you need?
- Which controller functions do you need?
- Add middleware you need to work with the body of a request and a response!
- Add error handling to each controller, and for undefined paths
- Add validation for the incoming data!


## Set up:  
- Set up a new project using [express](https://expressjs.com/en/starter/installing.html)
### 1. Create a project: 

  Work on the terminal:
- `git init` 
This command creates a git project
Add a `.gitignore` and add the line `node_modules` to the file. 


- `npm init`
This command takes you though the process of creating the package.json file. Press `enter` to select the options suggested. 
You can make changes to this file afterwards.

  ### 2. Install Express

- `npm install express`

### 3. Create the first file

- Create a file `index.js` 
and enter the template code here: 

```js 
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

### 4. Start the server!
On the terminal: type

`node index.js`

Now the server is running!
- You should see a console log on the terminal

- And you can send requests to it to `http://localhost:3000`
- Use Thunder client to send a request and inspect the response you get back!

**Optional**
Add a line to the package.json file in the `script` section: 

`"start": "node index.js",`

Now you can type `npm start` on the terminal to start the server!



## Task 1: GET data

- Create a set of mock data to use

##### Example data: 
``` js
let mockdata = [
  { text: "Build a to do app!", status: 'open', id: '01' },
  { text: "Learn SQL", status: 'open', id: '02'  },
  { text: "Practice JS on Codewars", status: 'open', id: '03'   },
  { text: "Commit your code!", status: 'open', id: '04'},
  { text: "Relax", status: 'open', id: '05' },
  { text: "Test the app", status: 'open', id: '06' },
]

```

- Add a  GET request in the `index.js` for the path `/todos` and a handler function in which send back some data that matches the data of the to do app! Add a status code for a successfull GET resquest (200)

>> Now you can connect your React ToDo app with this server. Use a `fetch` in the  React ToDo  to request data from the server!


### Error handling:

- Add error handling middleware for each controller, and for undefined paths

## Task 2: POST data

- Create callback for a POST request on the path `/todos`. 
- Add middleware you need to work with the body of a request and a response!

Here is an example of data we will send in the body of the request:
 ``` json
 { "text": "Build a to do app!", "status": "open", "id": "01" }
 ```

- Add validation for the incoming data! We need to check that the fields in the body have the values we expect. 
- Add sanitization of the data

We use express-validator for this! 

## Task 3:  PUT (update) data 
- Create a path and handler for a PUT request
- Here we need to use a dynamic path for the id
- Add validation for the incoming data: in the body and in the params!
- Send one message back if the validation was successful
- Send one other message back if the validation was not successful

## Task 4: DELETE data
- Create a path and handler for an DELETE request
- Read the params of the request to get the id of the task to delete. 
- Add validation for the incoming data in the params
- Send one message back if the validation was successful
- Send one other message back if the validation was not successful

Send some mock response on each request, and adapt the code (include Mongoose) once we have created the backend!

## Task 5: Connect to front end app! 
Here we need CORS!
This can be added by defining the headers ourselves or using the [cors middleware](https://expressjs.com/en/resources/middleware/cors.html) from express. 

### Steps: 
**Server**: 
1. Add cors middleware to the server using the [cors library](https://expressjs.com/en/resources/middleware/cors.html). Follow the instructions in the link

**Front end:**

#### Set up: 
Create a file with the name `.env.local`. Add a variable with the name `VITE_SERVER_TODOS` and give it the value ` 'http://localhost:3000'`
Now you can use this variable in the fetches: 
fetch(`${import.meta.env.VITE_SERVER_TODOS}/todos`)

#### 1. GET
1. Create a GET request using fetch to get all the todos from the backend when the `ToDOApp` component loads. (Remove the reading from local storage)
2. Adjust the code to display the data from the server. You might need to change the names of the properties
3. Add error handling. Display an error message if the fetch does not work. 

#### 2. POST
1. Create a POST request using fetch to post a new todo to the backend when a new to do is added on the front end (Remove the saving to local storage)
2. Adjust the code to display a message that saving worked. Suggestion: add an alert!
3. Add error handling. Display an error message if the fetch does not work. 

#### 3. Delete

1. Create a DELETE request using fetch. This request need to contain the id of the item you want to delete.  
2. Adjust the code to display a message that deleting worked. Suggestion: add an alert!
3. Add error handling. Display an error message if the fetch does not work. 
**Hint** The item should also still be deleted from the state!

#### 4. Put

1. Create a PUT request using fetch. This request need to contain the id of the item you want to update (in the params) and the updated object (in the body).  
2. Adjust the code to display a message that updating worked. Suggestion: add an alert!
3. Add error handling. Display an error message if the fetch does not work. 
**Hint** The item should also still be updated in the state!

# Data bases

## Set up: 
Create a database with Mongo DB
Create an account: Select "Sign up with Google" and use your beam student address: https://www.mongodb.com/cloud/atlas/register

Create a free cluster, which we will use for the to dos database. https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/

Remember the username and password!!! (Or store it somewhere)

## Connect to the database (using the MongoDB Client for VS Code)
Create a database with Mongo DB part 2
#### On mongo.db: 
Create the [database for the to do list](https://www.mongodb.com/docs/atlas/tutorial/create-mongodb-user-for-cluster/)

Here we also create a user for the database. Remember the username and password!!! (Or store it somewhere). We cannot retrieve it later, only change it!


Add one or more entries in the database. Use the same structure as in the frontend and server (add fields for the id, task and status) 
#### In VS Code: 

Add the extension [MongoDB](https://www.mongodb.com/docs/mongodb-vscode/install/)

Connect to the data base using the connection string (copy from mongo.db)
Explore the data in your database!



## Task 6: Repeat Task 1 - 4 with a Mongo DB database and mongoose

Set up a Mongo DB connection and update each of the 4 existing paths to modify the data in the database

1. Install dotenv and mongoose
1.  add a file `.env`
1. Create a variable `DATABASE_CONNECTION`` and store your connection string here (with username, password, cluster and name of the database ). 
 You can get the connection string from MongoDB. When you see the overview of the databases, click on "Connect" and select "Drivers" and copy the string. Now you only need to replace your password:
 Here is one example: 
'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority'
Here is one example: 
`mongodb+srv://<username>:<password>@beam.ey3snco.mongodb.net/<database>?retryWrites=true&w=majority`
1. Add the `.env` file to the `.gitignore` file
1. Add code to connect to the database (see mongoose set up in index.js)
1. Create a Schema for a model for the Todos. This is the model we use to interact witht he todos in the database. 
1. In the GET request handler, add a query to the db using the model. Find all tods and send the response to the frontend
1. In the POST request handler, add a query to the db using the model. Insert a new document in the database, witht he data from the body, using the `create` method.
1. In the PUT request handler, add a query to the db using the model. Insert a new document in the database, witht he data from the body, using the `updateOne` method.
1. In the DELETE request handler, add a query to the db using the model. Insert a new document in the database, witht he data from the body, using the `deleteOne` method.


Remember that all the data base queries are **asynchronous**.
Check that the data base operation was seuccessfull, and send a response. Send a error message if the  data base operation was not successfull. 
## Task 7: Deploy the backend to Vercel!

 - Change the cors settings of your backend once you have the api of your frontend to allow it to only resond to requests from your frontend!
 ``` js
 const corsOptions = {
  origin: 'https://yourfrontend.com',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions))
 ```

**Hints**
- Build your app step by step and test your app using the thunder client. 
- Remember to commit and push your code after finishing each task!

##### Example data: 
``` js
let mockdata = [
  { text: "Build a to do app!", status: 'open', id: '01' },
  { text: "Learn SQL", status: 'open', id: '02'  },
  { text: "Practice JS on Codewars", status: 'open', id: '03'   },
  { text: "Commit your code!", status: 'open', id: '04'},
  { text: "Relax", status: 'open', id: '05' },
  { text: "Test the app", status: 'open', id: '06' },
]

export default mockdata

```

**Bonus:**
- get only a specific subset of tasks: All tasks, only the not completed task, or only the completed tasks.
For this you can work with the query string: get a subset of all todos `todos/status/?done=false`/ `todos/status/?done=true`and check in controller  
`req.query.done` gives you the value `true` or `false`

[How to handle query strings](https://stackabuse.com/get-query-strings-and-parameters-in-express-js/)


