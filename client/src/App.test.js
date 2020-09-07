import React from "react";
import ReactDOM from "react-dom";
import { configure, shallow } from "enzyme";
import { expect } from "chai";
import App from "./App";
import Adapter from "enzyme-adapter-react-16";
import Loading from "./components/loading";

configure({ adapter: new Adapter() });

//Main component
describe("App component testing", function () {
  it("renders welcome message", function () {
    const wrapper = shallow(<App />);
    const welcome = <h1>Hello World</h1>;
    expect(wrapper.contains(welcome)).to.equal(true);
  });
});

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
