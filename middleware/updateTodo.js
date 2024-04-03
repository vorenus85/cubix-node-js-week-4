export const updateTodo = (objectRepository) => {
  const { todos } = objectRepository
  return (req, res, next) => {
    const id = req.params.id
    const todoIndex = res.locals.todoIndex
    const newTodo = req.body.todo

    if (typeof newTodo !== 'undefined') {
      todos[todoIndex].todo = newTodo
    }

    res.locals.updatedTodo = { id, todo: newTodo }
    return next()
  }
}
