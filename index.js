const express = require('express')
const { param, body, validationResult } = require('express-validator');
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');




const app = express()
const port = 3000
// Middleware to read the incoming data in json format: 
// First send a request without the middlware so that we see that we need it! (data is undefined otherwise)
app.use(express.json());
app.use(express.urlencoded({extended: true}))
// Use cors from library
app.use(cors())

let mockdata = [
  { task: "Build a to do app!", status: 'open', id:  uuidv4() },
  { task: "Learn SQL", status: 'open', id:  uuidv4()},
  { task: "Practice JS on Codewars", status: 'open', id:  uuidv4() },
  { task: "Commit your code!", status: 'open', id:  uuidv4() },
  { task: "Relax", status: 'open', id:  uuidv4() },
  { task: "Test the app", status: 'open', id:  uuidv4() },
]


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/todos', (req, res) => {
  res.status(200).json({
    success: true,
    data: mockdata
  })
})

// Create schema for valid todo:
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
  body('id').notEmpty().withMessage('Add id').trim().escape(),
]
//  Pass the shema as middle ware and add different responses depending on answer!
app.post('/todos', validTask, (req, res) => {
  console.log(req.body);
  const result = validationResult(req);
  if (result.isEmpty()) {
    res.status(201).json({
      success: true,
      message: 'Data was saved'
    })
  } else {
    res.status(500).send({ errors: result.array() });
  }
})
// Check the id in the params (as notEmpty or as UUID), then the body (reuse the post validator and sainitziation!)
app.put('/todos/:id', param('id').isUUID(), validTask, (req, res) => {
  console.log(req.body, req.params);
  const result = validationResult(req);
  if (result.isEmpty()) {
    res.status(200).json({
      success: true,
      message: 'Data was updated'
    })
  } else {
    res.status(500).send({ errors: result.array() });
  }
})


app.delete('/todos/:id',param('id').isUUID(), (req, res) => {
  console.log(req.body, req.params);
  const result = validationResult(req);
  if (result.isEmpty()) {
    res.status(200).json({
      success: true,
      message: 'Data was deleted'
    })
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