import {
  render,
  fireEvent,
  waitForElement,
  getByText,
  getAllByTestId,
  getByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
} from "@testing-library/react";
import Application from "components/Application";
import React from "react";
import { prettyDOM } from "@testing-library/react";

//afterEach(cleanup);
it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
// /****
//  * /**Click the 'Add' button on the first empty appointment. */
//   const addButton = getAllByTestId("addButton");
//   fireEvent.click(addButton[0]);
//   /**Enter the name "Lydia Miller-Jones"
//    * into the input with the placeholder "Enter Student Name".
//    *  */
//   const nameInput = getByPlaceholderText("Enter Student Name");
//   fireEvent.change(nameInput, { target: { value: "Lydia Miller-Jones" } });

//   /**Click the first interviewer in the list. */
//   const interviewer = getAllByTestId("interviewer-item");
//   fireEvent.click(interviewer[0]);

//   /**Click the "Save" button on that same appointment. */

//   const saveButton = getByText("Save"); // Select the button by its visible text content
//   fireEvent.click(saveButton);

//   /***Check that the element with the text "Saving" is displayed. */
//   expect(getByText("Saving")).toBeInTheDocument();

//   /**Wait until the element with the text "Lydia Miller-Jones" is displayed. */

//   await waitForElement(() => getByText("Lydia Miller-Jones"));

//   /**Check that the DayListItem
//    *with the text "Monday" also has the text "no spots remaining". */

//   const day = getAllByTestId("day");
//   expect(day[0]).toBeInTheDocument("Monday");
//   expect(day[0]).toBeInTheDocument("no spots remaining");
// });
//  ******/
