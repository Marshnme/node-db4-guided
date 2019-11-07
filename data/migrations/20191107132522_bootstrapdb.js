
exports.up = function(knex) {
    return knex.schema.createTable('species', tbl => {
        tbl.increments();
        tbl.string('name', 255).notNullable();
    })
    .createTable('animals', tbl => {
        tbl.increments();
        tbl.string('name',255).notNullable();

        //foreign key
        tbl.integer('species_id').unsigned()
        .references('id')
        .inTable('species')
        .onDelete('RESTRICT')  // about deleting record from primary key tbl Could be 'RESTRICT','DO NOTHING', 'CACADE'
        .onUpdate('CACADE');  //about changing the value of the primary key
    })
    .createTable('zoos', tbl => {
        tbl.increments();
        tbl.string('name',128).notNullable();
        tbl.string('address');
        tbl.date().notNullable();
        
    })
    .createTable('animal_zoos', tbl => {
        tbl.increments();
        tbl.integer('zoo_id').unsigned().notNullable()
        .references('id')
        .inTable('zoos')
        .onDelete('RESTRICT')
        .onUpdate('CACADE');
        tbl.integer('animal_id').unsigned().notNullable()
        .references('id')
        .inTable('animals')
        .onDelete('RESTRICT')
        .onUpdate('CACADE');
        tbl.date('from').notNullable();
        tbl.date('to').notNullable();
        
    })

};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('animal_zoos')
    .dropTableIfExists('zoos')
    .dropTableIfExists('animals')
    .dropTableIfExists('species')
    .dropTableIfExists('species_id')
};
