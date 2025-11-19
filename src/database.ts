import knex from "knex";

export const config = {
  client: "sqlite3",
  connection: {
    //fazendo a conexao com o banco de dados sqlite localizado na pasta tmp
    filename: "./db/app.db",
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
};

export const database = knex(config);

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

//migrations - eh um controle de versao pro banco de dados que permite gerenciar as alteracoes no schema do banco de dados de forma organizada e segura
// eh possivel ter um historico de alteracoes, reverter alteracoes e garantir que o banco de dados esteja sempre na versao correta
