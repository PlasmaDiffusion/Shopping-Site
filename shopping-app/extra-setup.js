function applyExtraSetup(sequelize) {
  const { user, cart, shopItem } = sequelize.models;

  cart.hasMany(shopItem);
  shopItem.belongsTo(cart);

  user.hasOne(cart);
  cart.belongsTo(user);
}

//(User) Select * from carts where userId = id
//(Cart) Select * from shopItems where cartId = id
//This won't work as intended with each shopItem belonging to a cart. We need a cartItem and shopItem I think?

module.exports = { applyExtraSetup };
