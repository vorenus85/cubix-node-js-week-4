import express from 'express'
import bodyParser from 'body-parser'

const app = express()

// parse application/json
app.use(bodyParser.json())

let globalId = 3
const todos = [
  {
    id: 1,
    todo: '1es',
  },
  {
    id: 2,
    todo: '2es',
  },
]

const getTodos = (req, res, next) => {
  console.table(todos)
  return res.json(todos)
}

const getTodoIndex = (req, res, next) => {
  const todoIdAsNumber = parseInt(req.params.id, 10)
  let foundId = -1
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === todoIdAsNumber) {
      foundId = i
      break
    }
  }

  // 404 if not found
  if (foundId === -1) {
    return res
      .status(404)
      .json({ error: `Todo not found with id: ${req.params.id}` })
  }

  res.locals.todoId = foundId
  return next()
}
const createTodo = (req, res, next) => {
  if (typeof req.body.todo == 'undefined') {
    // error case
    return res.status(400).json({ error: 'Missing todo' })
  }

  const newTodo = {
    id: globalId,
    todo: req.body.todo,
  }
  todos.push(newTodo)
  globalId++

  return res.json(newTodo)
}
const deleteTodo = (req, res, next) => {
  const deletedTodo = todos[res.locals.todoId]
  todos.splice(res.locals.todoId, 1)
  return res.json(deletedTodo)
}
const updateTodo = (req, res, next) => {
  if (typeof req.body.todo !== 'undefined') {
    todos[res.locals.todoId].todo = req.body.todo
  }

  return res.json(todos[res.locals.todoId])
}
const searchTodo = (req, res, next) => {
  if (typeof req.body.search == 'undefined') {
    // error case
    return res.status(400).json({ error: 'Missing search' })
  }

  const search = req.body.search
  return res.json(todos.filter((e) => e.todo.includes(search)))
}
app.get('/todos', getTodos)
app.get('/todos/:id', getTodoIndex, (req, res, next) =>
  res.json(todos[res.locals.todoId])
)
app.put('/todos', createTodo) // todo for create use post method
app.delete('/todos/:id', getTodoIndex, deleteTodo)
app.patch('/todos/:id', getTodoIndex, updateTodo)
app.post('/search', searchTodo)

app.listen(6000, function () {
  console.log('Running on :6000')
})
