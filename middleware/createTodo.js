export const createTodo = (objectRepository) => {
  const { todoModel, db, uuidv4 } = objectRepository;
  return (req, res, next) => {
    if (typeof req.body.todo == 'undefined') {
      // error case
      return res.status(400).json({ error: 'Missing todo' });
    }

    const newTodo = {
      id: uuidv4(),
      todo: req.body.todo,
    };
    todoModel.insert(newTodo);
    return db.saveDatabase((error) => {
      if (error) {
        console.error(error);
        return;
      }

      const { id, todo, ...restOf } = newTodo;
      return res.status(201).json({ id, todo });
    });
  };
};
