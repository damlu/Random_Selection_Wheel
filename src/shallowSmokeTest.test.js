import React from "React";
import { shallow } from "enzyme";
import App from "./App";
import { configureAdapter } from "./enzymeConfigure";

configureAdapter();

it("renders without crashing", () => {
  shallow(<App />);
});
