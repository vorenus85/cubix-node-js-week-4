import loki from 'lokijs';
const db = new loki('library.db');

export function initDatabase(callback) {
  db.loadDatabase({}, (error) => {
    if (error) {
      return callback(error);
    }

    let todoModel = db.getCollection('todos');

    if (todoModel === null) {
      todoModel = db.addCollection('todos');
    }

    db.saveDatabase((error) => {
      console.log('Saved');
      callback(error, { db, todoModel });
    });
  });
}
