const client = require('../config/database');

module.exports = {
  insertProduct: async () => {
    const query = `INSERT INTO products(name, quantity, "createdAt", "updatedAt")
    VALUES
    ('ASUS Laptop Z221', 5, '2001-09-27 23:00:00', '2001-09-27 23:00:00'),
    ('ASUS Laptop Z222', 5, '2001-09-27 23:00:00', '2001-09-27 23:00:00')`;
    client.query(query, (err, res) => {
      if (err) {
          console.log(err);
          return;
      }
    });
  },
  insertComponent: async () => {
    const query = `INSERT INTO components(name, description, "createdAt", "updatedAt")
    VALUES ('ASUS lcd 500', '20 inch', '2001-09-27 23:00:00', '2001-09-27 23:00:00')`;
    client.query(query, (err, res) => {
      if (err) {
          console.log(err);
          return;
      }
    });
  },
  insertSupplier: async () => {
    const query = `INSERT INTO suppliers(name, address, "createdAt", "updatedAt")
    VALUES
    ('Dreamzen Tech', 'Jember', '2001-09-27 23:00:00', '2001-09-27 23:00:00'),
    ('Hexa Tech', 'Jember', '2001-09-27 23:00:00', '2001-09-27 23:00:00')`;
    client.query(query, (err, res) => {
      if (err) {
          console.log(err);
          return;
      }
    });
  },
}