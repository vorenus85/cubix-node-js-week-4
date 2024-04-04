export const getTodos = (objectRepository) => {
  const { todoModel } = objectRepository;
  return (req, res, next) => {
    const allTodos = todoModel.find();
    res.locals.todos = res.json(allTodos);
    return next();
  };
};
