import { getClientUrl, getServerUrl } from "../../getUrl.js";
import axios from "axios";

export function submitProduct(state, user) {
  //Get data to submit from arguments
  const shopItemToSubmit = {
    user: user,
    name: state.name,
    description: state.description,
    imageLink: state.imageLink,
    price: state.price,
    amountInStock: state.amountInStock,
  };

  console.log("Sending JSON data:", shopItemToSubmit.children);

  if (this.props.editing) {
    //Edit an item or...
    axios
      .post(
        getServerUrl() + "/edit/shopItem/" + state.objectId,
        shopItemToSubmit
      )
      .then((res) => {
        console.log(res.data);
        alert(res.data);
        window.location.replace(getClientUrl() + "/admin");
      });
  } //Add a new item
  else {
    axios
      .post(getServerUrl() + "/add/shopItem", shopItemToSubmit)
      .then((res) => {
        console.log(res.data);
        alert(res.data);
        window.location.replace(getClientUrl() + "/admin");
      });
  }
}
