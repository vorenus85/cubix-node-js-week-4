export const searchTodo = (objectRepository) => {
  const { todos } = objectRepository

  return (req, res, next) => {
    if (typeof req.body.search == 'undefined') {
      // error case
      return res.status(400).json({ error: 'Missing search' })
    }

    const search = req.body.search
    return res.json(todos.filter((e) => e.todo.includes(search)))
  }
}
