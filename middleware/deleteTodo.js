export const deleteTodo = (objectRepository) => {
  const { todos } = objectRepository
  return (req, res, next) => {
    const id = req.params.id
    const todoIndex = res.locals.todoIndex
    todos.splice(todoIndex, 1)
    res.locals.deletedTodo = { id }
    return next()
  }
}
