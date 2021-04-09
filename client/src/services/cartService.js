import axios from "axios";
import { getServerUrl, getClientUrl } from "./getUrl.js";

//Sends an item to be added to a user's cart. The amount in stock and amount added to the cart is also needed to recaculate the item's stock.
export function addItemToCart(newCartItem, amountInStock, amountToAdd) {
  axios.post(getServerUrl() + "/create/cartItem", newCartItem).then((res) => {
    //Update the stock of the product too (Updates the product page and cart)
    let newStockData = {
      id: newCartItem.shopItemId,
      amountInStock: amountInStock - amountToAdd,
    };

    axios
      .post(getServerUrl() + "/update/shopItemStock", newStockData)
      .then((res) => {
        //Update the total price of the cart (Server side handles this)
        axios
          .post(getServerUrl() + "/update/cart", { id: newCartItem.cartId })
          .then((res) => {
            window.location.replace(getClientUrl() + "/cart");
          });
      });
  });
}
