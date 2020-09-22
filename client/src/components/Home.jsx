import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Match,
  useParams,
  useHistory,
} from "react-router-dom";

import AuthNav from "./navbar.jsx";
import Profile from "./profile.jsx";
import PrivateRoute from "./private-route.jsx";
import ExternalApi from "./external-api.jsx";
import ShopItemForm from "./adminComponents/shopItemForm";
import AdminNavigation from "./adminComponents/adminNavigation";
import AdminSearch from "./adminComponents/adminSearch";
import SearchBar from "./searchComponents/searchBar.jsx";
import ProductPage from "./productPage.jsx";
import Cart from "./cartComponents/cart.jsx";
import ProductCarousel from "./homeComponents/productCarousel";
import FeaturedProducts from "./homeComponents/featuredProducts.jsx";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
        <Switch>
          <Route exact path="/">
            <AuthNav />
            <FeaturedProducts />
          </Route>
          <Route exact path="/search">
            <AuthNav />
            <SearchBar searchResults={true} />
          </Route>
          <Route exact path="/product">
            <AuthNav />
            <ProductPage />
          </Route>
          {/* Private routes go below */}
          <PrivateRoute exact path="/profile">
            <Profile />
          </PrivateRoute>
          <PrivateRoute exact path="/cart">
            <AuthNav />
            <Cart />
          </PrivateRoute>
          <PrivateRoute exact path="/api">
            <ExternalApi />
          </PrivateRoute>
          <PrivateRoute exact path="/admin">
            <AuthNav />
            <AdminNavigation currentPage={"Add Product"} />
            <ShopItemForm updatingItem={false} />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/search">
            <AdminNavigation currentPage={"Find Products to Edit"} />
            <AdminSearch />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/update/:id">
            <h1>Update</h1>
            <AdminNavigation />
            <ShopItemForm updatingItem={true} />
          </PrivateRoute>
        </Switch>
      </Router>
    );
  }
}

export default Home;
