USE DATABASE mortarpestel_db;
CREATE TABLE ingredients
(
	ingredient_id INT NOT NULL auto_increment,
	name VARCHAR(50) NOT NULL,
  measurement VARCHAR(250) NOT NULL,
	quantity INT NOT NULL,
	recipe_id INT,

	PRIMARY KEY (ingredient_id),
  FOREIGN KEY (recipe_id) REFERENCES recipes(recipes_id)

);


USE mortarpestel_db;

INSERT INTO ingredients
(ingredient_id, name, measurement, quantity, recipe_id)
VALUES
("chicken", "lbs", "2", recipe_id);

-- MODEL for ingredient_id

const Ingredient = Sequelize.define('ingredient', {
  name: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: "ingredient" },

  measurement: {
		type: Sequelize.STRING
		allowNull: false,
		defaultValue: "cups" },

  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 10,
    validate: { min: 0, max: 1000 }
  }
  };
-- }, {
--   validate: {
--     bothCoordsOrNone() {
--       if ((this.latitude === null) !== (this.longitude === null)) {
--         throw new Error('Require either both latitude and longitude or neither')
--       }
--     }
--   }
-- })
