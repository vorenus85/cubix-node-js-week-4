export const getTodo = (objectRepository) => {
  const { todoModel } = objectRepository;
  return (req, res, next) => {
    const foundedTodo = todoModel.findOne({ id: req.params.id });
    // 404 if not found
    if (!foundedTodo) {
      return res
        .status(404)
        .json({ error: `Todo not found with id: ${req.params.id}` });
    }

    res.locals.todo = foundedTodo;
    return next();
  };
};
