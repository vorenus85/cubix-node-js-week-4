export const createTodo = (objectRepository) => {
  const { todos, uuidv4 } = objectRepository
  return (req, res, next) => {
    if (typeof req.body.todo == 'undefined') {
      // error case
      return res.status(400).json({ error: 'Missing todo' })
    }

    const newTodo = {
      id: uuidv4(),
      todo: req.body.todo,
    }
    todos.push(newTodo)

    return res.status(201).json(newTodo)
  }
}
