
exports.seed = async function(knex) {
  await knex('user_post').truncate()
  await knex('user_post').insert([{
    user_id:1,post_id:2
  },{
    user_id:2,post_id:2
  },{
    user_id:2,post_id:3
  }])
};
