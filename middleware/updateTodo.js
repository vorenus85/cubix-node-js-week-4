export const updateTodo = (objectRepository) => {
  const { todoModel, db } = objectRepository;
  return (req, res, next) => {
    const id = req.params.id;
    const newTodo = req.body.todo;

    if (typeof newTodo !== 'undefined') {
      res.locals.todo.todo = newTodo;
    } else {
      return res.status(404).json({ error: `Please give todo string` });
    }

    todoModel.update(res.locals.todo);

    return db.saveDatabase((error) => {
      if (error) {
        console.error(error);
        return;
      }
      res.locals.updatedTodo = { ...res.locals.todo };
      return next();
    });
  };
};
