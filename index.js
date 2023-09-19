const express = require('express')
const app = express()
const port = 3000

let mockdata = [
  { text: "Build a to do app!", status: 'open', id: '01' },
  { text: "Learn SQL", status: 'open', id: '02'  },
  { text: "Practice JS on Codewars", status: 'open', id: '03'   },
  { text: "Commit your code!", status: 'open', id: '04'},
  { text: "Relax", status: 'open', id: '05' },
  { text: "Test the app", status: 'open', id: '06' },
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

// ---------- Error  handling: -----------// 
// Use a wildcard to respons to a request to to any not defined path.
app.use('*', (req, res, next) => {
  let err = new Error(`${req.originalUrl} is not a path`);
  err.statusCode = 404;
  next(err);
});

// Add the error response as last middleware: This will trigger the `next()` function in the previous middleware to call this function:
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