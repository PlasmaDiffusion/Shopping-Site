import axios from "axios";
import { getServerUrl } from "./getUrl.js";

export function placeOrder(username, id) {
  //The cart needs to get its owner name modified. This will keep the cart on the server but let the user have a new one.
  return axios
    .post(getServerUrl() + "/prepareForOrder", { id: id })
    .then((res) => {
      //The order now needs to be created with a reference to the cart
      const newOrderData = {
        cartId: id,
        owner: username,
        status: "Proccessing",
      };

      //Pass in the new order to the server
      axios.post(getServerUrl() + "/create/order", newOrderData);
    });
}

//Read in general order information (Like the order status and when it was placed)
export function readOrders(orderOwner) {
  return axios
    .post(getServerUrl() + "/read/orders", { username: orderOwner })
    .then((res) => res.data);
}

//Read in the actual items/cart of the order (So the actual product, and amount)
export function readOrderItems(orderOwner) {
  return axios
    .post(getServerUrl() + "/read/cartsWithItems/", { username: orderOwner })
    .then((res) => res.data);
}
