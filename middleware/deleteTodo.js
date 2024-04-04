export const deleteTodo = (objectRepository) => {
  const { todoModel, db } = objectRepository;
  return (req, res, next) => {
    const id = req.params.id;
    todoModel.remove(res.locals.todo);

    return db.saveDatabase((error) => {
      if (error) {
        console.error(error);
        return;
      }
      res.locals.deletedTodo = { id };
      return next();
    });
  };
};
