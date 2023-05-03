import { mount } from "enzyme";
import axios from "axios";
import { Viewer } from "@react-pdf-viewer/core";
import Handbook from "../Pages/Handbook";

describe("<Handbook />", () => {
  let axiosGetSpy;

  before(() => {
    axiosGetSpy = jest.spyOn(axios, "get");
  });

  after(() => {
    axiosGetSpy.mockRestore();
  });

  it("should render PDF viewer if PDF file is available", async () => {
    const pdfBlob = new Blob(["fake pdf data"], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    axiosGetSpy.mockResolvedValueOnce({
      data: pdfBlob,
    });

    const wrapper = mount(<Handbook />);

    await new Promise((resolve) => setImmediate(resolve));

    wrapper.update();

    expect(wrapper.find(Viewer)).toHaveLength(1);
    expect(wrapper.find({ fileUrl: pdfUrl })).toHaveLength(1);
  });

  it("should render 'No PDF Found!' message if PDF file is not available", async () => {
    axiosGetSpy.mockRejectedValueOnce(new Error("404 Not Found"));

    const wrapper = mount(<Handbook />);

    await new Promise((resolve) => setImmediate(resolve));

    wrapper.update();

    expect(wrapper.find(Viewer)).toHaveLength(0);
    expect(
      wrapper.containsMatchingElement(
        <p>No PDF Found!</p>
      )
    ).toBe(true);
  });
});
