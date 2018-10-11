import React from "react";
import { shallow, mount, debug, render, containsMatchingElement } from "enzyme";
import {
  StaticRouter,
  MemoryRouter,
  Router,
  Route,
  Redirect,
  Switch
} from "react-router";
import App from "./App";
import { configureAdapter } from "./enzymeConfigure";
import MockRouter from "react-mock-router";
import createRouterContext from "react-router-test-context";

configureAdapter();
//
describe("main app page", () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });

  it("renders about", () => {
    const context = createRouterContext({ location: { pathname: "/about" } });
    const push = jest.fn();
    const wrapper = mount(
      <MockRouter push={push} location={"/about"} path={"/about"}>
        <Route
          render={props => (
            <App
              location={"/about"}
              path={"/about"}
              history={{ location: "/about" }}
            />
          )}
        />
      </MockRouter>
    );
    console.log(wrapper.debug());
    expect(wrapper.find(App).exists()).toBe(true);
  });
});
