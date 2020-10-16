
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {title: "sampleTitle", text: 'sampleText',result:'sampleResult'}
       
      ]);
    });
};
