export const updateTodo = (objectRepository) => {
  const { todos, findTodoIndex, findTodo, notFound } = objectRepository
  return (req, res, next) => {
    const id = req.params.id
    const newTodo = req.body.todo

    const todoToUpdate = findTodo(todos, id)
    // 404 if not found
    if (!todoToUpdate) {
      return notFound(req, res)
    }

    if (typeof newTodo !== 'undefined') {
      const todoIndex = findTodoIndex(todos, id)
      todos[todoIndex].todo = newTodo
    }

    res.locals.updatedTodo = { id, todo: newTodo }
    return next()
  }
}
