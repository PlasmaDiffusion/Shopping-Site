import React from "react";
import ReactDOM from "react-dom";
import { configure, shallow } from "enzyme";
import { expect } from "chai";
import sinon from "sinon";
import App from "./App";
import Adapter from "enzyme-adapter-react-16";
import Loading from "./components/loading";
import SearchBar from "./components/searchComponents/searchBar";
import ProductPage from "./components/productPage";

configure({ adapter: new Adapter() });

const clickSpy = sinon.spy();

/*const wrapper = shallow(<App />);
  const welcome = <h1>Hello World</h1>;
  expect(wrapper.contains(welcome)).to.equal(true);*/

//Loading component
describe("Loading component", function () {
  it("renders a basic loading <p> message", function () {
    const container = shallow(<Loading />);
    const msg = <p>Loading...</p>;
    expect(container.find("p").length).to.equal(1);
  });
});

//Profile component
describe("Profile component", function () {
  it("renders a name in h2, but not when logged in", function () {
    const container = shallow(<Loading />);
    expect(container.find("h2").length).to.equal(0);
  });
});

//Product
describe("Product Page component", function () {
  it("renders an apple if id is 1", async function () {
    const wrapper = shallow(<ProductPage />);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    expect(wrapper.state().loaded).to.equal(true);
    const name = <h2>Apple</h2>;
    expect(wrapper.contains(name)).to.equal(true);
  });
});

/*/Search bar
describe("Searchbar", function () {
  it("should have some results after you enter 'a'", function () {
    const container = shallow(<SearchBar />);

    container.find("#searchButton").simulate("click");
    expect(clickSpy.calledOnce).to.equal(true);
    //expect(container.find("#searchButton")).to.equal(true);
  });
});*/
