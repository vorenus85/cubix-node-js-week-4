import express from "express";
import bodyParser from "body-parser";

const app = express();

// parse application/json
app.use(bodyParser.json());

let globalId = 3;
const books = [
  {
    id: 1,
    title: "1es",
    author: "loremipsum",
  },
  {
    id: 2,
    title: "2es",
    author: "loremipsum2",
  },
];

const getBooks = (req, res, next) => {
  console.table(books);
  return res.json(books);
};

const getBookIndex = (req, res, next) => {
  const bookIdAsNumber = parseInt(req.params.id, 10);
  let foundId = -1;
  for (let i = 0; i < books.length; i++) {
    if (books[i].id === bookIdAsNumber) {
      foundId = i;
      break;
    }
  }

  // 404 if not found
  if (foundId === -1) {
    return res
      .status(404)
      .json({ error: `Book not found with id: ${req.params.id}` });
  }

  res.locals.bookId = foundId;
  return next();
};
const createBook = (req, res, next) => {
  if (
    typeof req.body.title == "undefined" ||
    typeof req.body.author == "undefined"
  ) {
    // error case
    return res.status(400).json({ error: "Missing title or author" });
  }

  const newBook = {
    id: globalId,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(newBook);
  globalId++;

  return res.json(newBook);
};
const deleteBook = (req, res, next) => {
  const deletedBook = books[res.locals.bookId];
  books.splice(res.locals.bookId, 1);
  return res.json(deletedBook);
};
const updateBook = (req, res, next) => {
  if (typeof req.body.title !== "undefined") {
    books[res.locals.bookId].title = req.body.title;
  }
  if (typeof req.body.author !== "undefined") {
    books[res.locals.bookId].author = req.body.author;
  }

  return res.json(books[res.locals.bookId]);
};
const search = (req, res, next) => {
  if (typeof req.body.search == "undefined") {
    // error case
    return res.status(400).json({ error: "Missing search" });
  }

  const s = req.body.search;
  return res.json(
    books.filter((e) => e.author.includes(s) || e.title.includes(s))
  );
};

const auth = (req, res, next) => {
  if (typeof req.query.auth === "undefined") {
    return res.status(400).json({ error: "Missing auth" });
  }

  if (req.query.auth !== "belaba") {
    return res.status(401).json({ error: "Wrong auth." });
  }
  return next();
};

app.use("/book", auth);
app.get("/book", getBooks);
app.get("/book/:id", getBookIndex, (req, res, next) =>
  res.json(books[res.locals.bookId])
);
app.put("/book", createBook);
app.delete("/book/:id", getBookIndex, deleteBook);
app.patch("/book/:id", getBookIndex, updateBook);
app.post("/search", search);

app.listen(6000, function () {
  console.log("Running on :6000");
});
