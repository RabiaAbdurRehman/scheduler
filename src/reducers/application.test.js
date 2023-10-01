import { getAllByPlaceholderText, getAllByTestId, getByAltText, getByTestId } from "@testing-library/react";
import reducer from "reducers/application";

describe("Application Reducer", () => {
  it("thows an error with an unsupported type", () => {
    expect(() => reducer({}, { type: null })).toThrow();
  });
});


