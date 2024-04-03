export const getTodo = (objectRepository) => {
  const { todos } = objectRepository
  return (req, res, next) => {
    const id = req.params.id

    const foundedTodo = todos.find((todo) => todo.id === id)
    // 404 if not found
    if (!foundedTodo) {
      return res
        .status(404)
        .json({ error: `Todo not found with id: ${req.params.id}` })
    }

    res.locals.todo = foundedTodo
    res.locals.todoIndex = todos.findIndex((obj) => obj.id === id)
    return next()
  }
}
