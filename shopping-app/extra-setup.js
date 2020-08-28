const cartItem = require("./models/cartItem");

function applyExtraSetup(sequelize) {
  const { user, cart, shopItem, cartItem } = sequelize.models;

  //A cart item has a reference to a shop item so it knows what it actually is
  shopItem.hasMany(cartItem);
  cartItem.belongsTo(shopItem);

  //A cart item is one of several items in a user's cart
  cart.hasMany(cartItem);
  cartItem.belongsTo(cart);

  //Every user will have a cart
  user.hasOne(cart);
  cart.belongsTo(user);
}

//(User) Select * from carts where userId = id
//(Cart) Select * from cartItems where cartId = id
//(CartItem) Get shopItemId to reference the item being bought
module.exports = { applyExtraSetup };
