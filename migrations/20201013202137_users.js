
exports.up = async function(knex) {
  await knex.schema.createTable('users',tbl=>{
      tbl.increments();
      tbl.text('username')
      tbl.text('password')
      tbl.text('post')
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users')
};
