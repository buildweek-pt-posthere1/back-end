
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "sample1", password: 'sample password'},
        {username: "sample2", password: 'sample password'},
        
      ]);
    });
};
