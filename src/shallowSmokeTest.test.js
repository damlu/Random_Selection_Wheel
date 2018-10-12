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

  // this is for checking if text renders on the page without needing to be routed somewhere
  // it("renders Home", () => {
  //   const wrapper = shallow(<App />);
  //   const home = <h2>Home</h2>;
  //   expect(wrapper.contains(home)).toEqual(true);
  // });

  // it("routes the About component", () => {
  //   const component = mount(
  //     <MemoryRouter initialEntries={["/"]}>
  //       <App />
  //     </MemoryRouter>
  //   );
  //   component.instance().history.replace("/about");
  //   component.update();
  //   console.log(component.debug());
  //   // console.log(component.instance().debug());
  //   const topics = <h2>topics</h2>;
  //   expect(component.contains(topics)).toEqual(true);
  // });

  // it("renders about", () => {
  //   const context = createRouterContext({ location: { pathname: "/about" } });
  //   const wrapper = mount(
  //     <Switch>
  //       <Route path="/about" component={App} />
  //     </Switch>,
  //     { context }
  //   );
  //   // const wrapper = mount(<App history={"/about"} />);
  //   console.log(wrapper.debug());
  //   expect(wrapper.find(App).exists()).toBe(true);
  // });
});
