const express = require('express')
const cors = require('cors')
const { param, body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

// const Todo = require("./todo_model")


const app = express()
const port = 3000


/** Mongoose Setup  */
const mongoose = require("mongoose");

let addressString = process.env.ATLAS_URI;
let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

/** Connect  Mongoose Modul with the database */
mongoose.connect(addressString, options)
  .then(() => {
    console.log("Connected to the db");
  }).catch(error => {
    console.error("A connection error from MongoDB: " + error);
  });

// Schema for a to do: 
const { Schema } = mongoose;

const TodoSchema = new Schema(
  {
    task: String,
    id: String,
    status: String
  }
);
const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

let mockdata = [
  { task: "Build a to do app!", status: 'open', id: uuidv4() },
  { task: "Learn SQL", status: 'open', id: uuidv4() },
  { task: "Practice JS on Codewars", status: 'open', id: uuidv4() },
  { task: "Commit your code!", status: 'open', id: uuidv4() },
  { task: "Relax", status: 'open', id: uuidv4() },
  { task: "Test the app", status: 'open', id: uuidv4() },
]


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/todos', async (req, res) => {
  console.log(Todo);
  let data = await Todo.find({})
  console.log(data);
  res.status(200).json({
    success: true,
    my_data: data
  })
})

const validTask = [
  body('task')
    .notEmpty()
    .withMessage('Please enter a task. It should be a string or sentence')
    .trim()
    .escape(),
  body('status')
    .isIn(['open', 'done'])
    .withMessage('Please enter a valid status')
    .trim()
    .escape(),
  body('id').isUUID().withMessage('Add id').trim().escape(),
]

app.post('/todos', validTask, async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      let dbResponse = await Todo.create({ id: req.body.id, task: req.body.task, status: req.body.status })
      res.status(201).json({
        success: true,
        message: `Data was saved with the id${dbResponse._id}`
      })
    } catch (error) {
      throw new Error("Could not save data")
    }
  } else {
    res.status(500).send({ errors: result.array() });
  }
})

app.put('/todos/:id', param('id').isUUID(), validTask, async (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      // returns the old data findOneAndUpdate. `updateOne` lets us know if the item was updated
      let dbResponse = await Todo.updateOne({ id: req.params.id }, { id: req.body.id, task: req.body.task, status: req.body.status })
      console.log('old data', dbResponse);
      if (dbResponse.modifiedCount) {
        res.status(201).json({
          success: true,
          message: `Data was updated for  ${dbResponse.modifiedCount} documents`
        })
      }
      // Demo a unseccsssfull update with a wrong uuid
      else throw new Error("Could not update")
    } catch (error) {
      // let my_error = new Error("Could not save data")
      next(error)
    }
  } else {
    res.status(500).send({ errors: result.array() });
  }
})


app.delete('/todos/:id', param('id').isUUID(), async (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
    let dbResponse = await Todo.deleteOne({id: req.params.id})
    console.log(dbResponse);
    if(dbResponse.deletedCount){
    res.status(200).json({
      success: true,
      message: 'Data was deleted'
    }) 
  }      else throw new Error("Could not delete")

} catch(error){
  next(error)
  }
  } else {
    res.status(500).send({ errors: result.array() });
  }
})


// ---------- Error  handling: -----------// 
app.use('*', (req, res, next) => {
  let err = new Error(`${req.originalUrl} is not a path`);
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log('in error middleware,', err);
  res.status(err.status || err.statusCode || 500).send({
    error: {
      status: err.status || err.statusCode,
      message: err.message || 'Internal Server Error',
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})