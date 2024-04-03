import express from 'express'
import bodyParser from 'body-parser'
import { v4 as uuidv4 } from 'uuid'
import { getTodos } from './middleware/getTodos.js'
import { getTodo } from './middleware/getTodo.js'
import { createTodo } from './middleware/createTodo.js'
import { deleteTodo } from './middleware/deleteTodo.js'
import { updateTodo } from './middleware/updateTodo.js'
import { searchTodo } from './middleware/searchTodo.js'
import { findTodo, findTodoIndex, notFound } from './utils.js'

const app = express()

// parse application/json
app.use(bodyParser.json())

const objectRepository = {
  notFound,
  findTodoIndex,
  findTodo,
  uuidv4,
  todos: [
    {
      id: 'asd-123-asd',
      todo: 'First todo',
    },
    {
      id: 'mnb-321-mnb',
      todo: 'Second todo',
    },
  ],
}

app.get('/todos', getTodos(objectRepository))
app.get('/todos/:id', getTodo(objectRepository), (req, res, next) => {
  return res.status(200).json(res.locals.todo)
})
app.post('/todos', createTodo(objectRepository))
app.delete('/todos/:id', deleteTodo(objectRepository), (req, res, next) => {
  return res.status(204).json(res.locals.deleteTodo)
})
app.patch('/todos/:id', updateTodo(objectRepository), (req, res, next) => {
  return res.status(204).json(res.locals.updatedTodo)
})
app.post('/search', searchTodo(objectRepository))

app.listen(6000, function () {
  console.log('Running on :6000')
})
