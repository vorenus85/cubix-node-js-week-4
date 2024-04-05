import { v4 as uuidv4 } from 'uuid';
import { getTodos } from '../middleware/getTodos.js';
import { getTodo } from '../middleware/getTodo.js';
import { createTodo } from '../middleware/createTodo.js';
import { deleteTodo } from '../middleware/deleteTodo.js';
import { updateTodo } from '../middleware/updateTodo.js';
import { searchTodo } from '../middleware/searchTodo.js';

export function addRoutes(app, db, todoModel) {
  const objectRepository = {
    uuidv4,
    db,
    todoModel,
  };

  app.get('/todos', getTodos(objectRepository));
  app.get('/todos/:id', getTodo(objectRepository), (req, res, next) => {
    return res.status(200).json(res.locals.todo);
  });
  app.post('/todos', createTodo(objectRepository));
  app.delete(
    '/todos/:id',
    getTodo(objectRepository),
    deleteTodo(objectRepository),
    (req, res, next) => {
      return res.status(204).json();
    }
  );
  app.patch(
    '/todos/:id',
    getTodo(objectRepository),
    updateTodo(objectRepository),
    (req, res, next) => {
      return res.status(204).json();
    }
  );
  app.post('/search', searchTodo(objectRepository));
}
