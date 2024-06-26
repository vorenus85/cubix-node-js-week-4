export const searchTodo = (objectRepository) => {
  const { todoModel } = objectRepository;

  return (req, res, next) => {
    if (typeof req.body.search == 'undefined') {
      // error case
      return res.status(400).json({ error: 'Missing search' });
    }

    const search = req.body.search;

    const result = todoModel.find({ todo: { $regex: search } });

    return res.json(result);
  };
};
