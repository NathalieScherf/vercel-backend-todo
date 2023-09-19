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

[Here](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning) you can see a generall front end version of the app. 




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

`"start": node index.js`

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
- Add error handling middleware for each controller, and for undefined paths


### Error handling:


## Task 2: POST data

- Create handler for a POST request on the path `/todos`. 
- Add middleware you need to work with the body of a request and a response!

Here is an example of data we will send in the body of the request:
 ``` json
 { "text": "Build a to do app!", "status": "open", "id": "01" }
 ```

- Add validation for the incoming data! We need to check that the fields in the body have the values we expect. 
- Add sanitization of the data

We use express-validator for this! => Includes sanitization
Or yup? => easier code, no sanitaztion
## Task 3: UPDATE data (WIP)
- Create a path and handler for an UPDATE request
- Add validation for the incoming data!

## Task 4: DELETE data
- Create a path and handler for an DELETE request
- Read the query string comming in with the id!

Send some mock response on each request, and adapt the code (include Mongoose) once we have created the backend!

## Task 5: Connect to front end app! 
Here we need CORS!


--- 

## Generall Comments
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


