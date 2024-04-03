export const deleteTodo = (objectRepository) => {
  const { todos, findTodo, findTodoIndex, notFound } = objectRepository
  return (req, res, next) => {
    const id = req.params.id
    const todoToDelete = findTodo(todos, id)
    console.log('todoToDelete', deletedTodo)
    // 404 if not found
    if (!todoToDelete) {
      return notFound(req, res)
    }
    const deletedTodoIndex = findTodoIndex(todos, id)
    todos.splice(deletedTodoIndex, 1)
    res.locals.deletedTodo = todoToDelete
    return next()
  }
}
