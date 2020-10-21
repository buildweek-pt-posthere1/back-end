
exports.up = async function(knex) {
  await knex.schema.createTable('users',tbl=>{
      tbl.increments();
      tbl.text('username').notNull().unique()
      tbl.text('password').notNull()
     
  })
  await knex.schema.createTable('posts',tbl=>{
    tbl.increments();
    tbl.text('title')
    tbl.text('text')
    tbl.text('result')
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('posts')
};
