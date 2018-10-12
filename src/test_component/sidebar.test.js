import React from "react";
import { shallow, mount, debug, render, containsMatchingElement } from "enzyme";
import { MemoryRouter } from "react-router";
import Sidebar from "./sidebar";
import { configureAdapter } from "./../enzymeConfigure";
configureAdapter();
test("it expands when the button is clicked", () => {
  const wrapper = mount(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  );
  console.log(wrapper.debug());
});
