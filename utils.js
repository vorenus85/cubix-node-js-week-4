export const findTodo = (todos, id) => {
  return todos.find((todo) => todo.id === id)
}

export const findTodoIndex = (todos, id) => {
  return todos.findIndex((obj) => obj.id === id)
}

export const notFound = (req, res) => {
  return res
    .status(404)
    .json({ error: `Todo not found with id: ${req.params.id}` })
}
