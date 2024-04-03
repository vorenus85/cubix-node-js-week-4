export const getTodo = (objectRepository) => {
  const { todos, findTodo, notFound } = objectRepository
  return (req, res, next) => {
    const id = req.params.id

    const foundedTodo = findTodo(todos, id)
    const todoIndex = todos.findIndex((obj) => obj.id === id)
    // 404 if not found
    if (!foundedTodo) {
      return notFound(req, res)
    }

    res.locals.todo = foundedTodo
    res.locals.todoIndex = todoIndex
    return next()
  }
}
