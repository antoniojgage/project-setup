// Burger models

// The burger has a burger_name attribute of type DataTypes.String
// and a devoured attribute that is false by default

module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define("Location", {
    latitude: {
      type: DataTypes.DECIMAL(7,5),
      required: true
    },
    longitude: {
      type: DataTypes.DECIMAL(8,5),
      required: true
    },
    tag: {
      type: DataTypes.STRING,
      required: true
    },
    category: {
      type: DataTypes.STRING,
      required: true
    }

  
  });
  return Location;
};
