
exports.up = async function(knex) {
  await knex.schema.createTable('user_post',table=>{
      table.integer('user_id').references('id').inTable('users').onUpdate("CASCADE")
      .onDelete("CASCADE");
      table.integer('post_id').references('id').inTable('posts').onUpdate("CASCADE")
      .onDelete("CASCADE");
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("user_post")
};
