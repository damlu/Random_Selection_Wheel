import React from "react";
import { shallow } from "enzyme";
import {} from "react-router";
import App from "./App";
import { configureAdapter } from "./enzymeConfigure";

configureAdapter();
//
describe("main app page", () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });
});
