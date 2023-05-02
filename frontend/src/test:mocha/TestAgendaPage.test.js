import React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import Agenda from "../Pages/Agenda";

describe("<Agenda />", () => {
  it("should render a welcome message", () => {
    const wrapper = mount(<Agenda />);
    expect(wrapper.find("Text")).to.have.lengthOf(2);
    expect(wrapper.find("Text").at(0).text()).to.equal(
      "Welcome to IITH Senate Search portal- Agenda."
    );
    expect(wrapper.find("Text").at(1).text()).to.equal(
      "Here you can easily view and track previous Senate Meeting Minutes."
    );
  });

  it("should render a PDF viewer", (done) => {
    const wrapper = mount(<Agenda />);
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find("Viewer")).to.have.lengthOf(1);
      done();
    }, 1000);
  });

  it('should show a "No PDF Found" message when there is no PDF', () => {
    const wrapper = mount(<Agenda />);
    wrapper.setState({ pdfFile: null });
    expect(wrapper.find("Text").last().text()).to.equal("No PDF Found!!!");
  });
});
