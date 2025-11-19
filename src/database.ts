import knex from "knex";

export const database = knex({
  client: "sqlite3",
  connection: {
    filename: "./tmp/app.db",
  },
  useNullAsDefault: true,
});

//usando o query builder que no caso é o knex
// com ele podemos fazer consultas mais complexas no banco de dados de forma mais simples
// codigo javascript aqui pra fazer consultas no banco de dados
// exemplo :

// knex('users').select('*') - SELECT * FROM users
// knex('users').where('id', 1) - SELECT * FROM users WHERE id = 1
// knex('users').insert({ name: 'João', email: 'joao@email.com' }) - INSERT INTO users
// knex('users').where('id', 1).update({ name: 'Maria' }) - UPDATE users SET name = 'Maria' WHERE id = 1
// knex('users').where('id', 1).delete() - DELETE FROM users WHERE id = 1
// knex('users').where('age', '>', 18).select('name', 'email') - SELECT name, email FROM users WHERE age > 18
