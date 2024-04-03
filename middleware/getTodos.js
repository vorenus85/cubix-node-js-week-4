export const getTodos = (objectRepository) => {
  const { todos } = objectRepository
  return (req, res, next) => {
    res.locals.todos = res.json(todos)
    return next()
  }
}
