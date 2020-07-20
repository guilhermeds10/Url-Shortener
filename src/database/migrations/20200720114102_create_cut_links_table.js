
exports.up = function(knex) {
    return knex.schema.createTable('cut_links', function(table){
        table.increments('id');
        table.string('code', 10).notNullable();
        table.string('redirect_url', 5000).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('cut_links');
};
