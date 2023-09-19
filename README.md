# A backend for the to do app

In this project you will create an express backend for a Todo app. 


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

>> Now you can connect your React ToDo app with this server. Use a `fetch` in the  React ToDo  to request data from the server! This needs cors!


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
3. Add error handling. Display an error message if the fetch does not wrok. 

#### 2. POST
1. Create a POST request using fetch to post a new todo to the backend when a new to do is added on the front end (Remove the saving to local storage)
2. Adjust the code to display a message that saving worked. Suggestion: add an alert!
3. Add error handling. Display an error message if the fetch does not wrok. 

#### 3. Delete

1. Create a DELETE request using fetch. This request need to contain the id of the item you want to delete.  
2. Adjust the code to display a message that deleting worked. Suggestion: add an alert!
3. Add error handling. Display an error message if the fetch does not wrok. 
**Hint** The item should also still be deleted from the state!

#### 4. Put

1. Create a PUT request using fetch. This request need to contain the id of the item you want to update (in the params) and the updated object (in the body).  
2. Adjust the code to display a message that updating worked. Suggestion: add an alert!
3. Add error handling. Display an error message if the fetch does not wrok. 
**Hint** The item should also still be updated in the state!



## Task 1 - 4 with a Mongo DB database

Set up a Mongo DB connection and update each of the 4 existing paths to modify the data in the database


## Task 6: Deploy the backend to Vercel!

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


