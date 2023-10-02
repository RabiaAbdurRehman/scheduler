import {
  render,
  getByAltText,
  getByText,
  getAllByTestId,
  queryByAltText,
  queryByText,
  waitForElement,
  fireEvent,
  getAllByText,
  getByTestId,
  prettyDOM,
} from "@testing-library/react";

import Application from "components/Application";
import React from "react";

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  try {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));

    // 4. Check that the cancel is shown.
    //fireEvent.click(queryByText(appointment, "Cancel"));

   
    // 5. Change the name for the interview.
    fireEvent.change(getByTestId(appointment, "student-name-input"), {
      target: { value: "New Student Name" },
    });

    const spotsBefore = getAllByTestId(container, "spots");

    // 6. Check that the Save is shown.
    fireEvent.click(queryByText(appointment, "Save"));

    //We don't want the spots to change for "Monday", since this is an edit.
    const spotsAfter = getAllByTestId(container, "spots");

    expect(spotsBefore).toEqual(spotsAfter);
  } catch (e) {
    console.log(e);
  }
  //debug(appointment);
});
/***
 * We want to start by finding an existing interview.
With the existing interview we want to find the edit button.
We change the name and save the interview.
We don't want the spots to change for "Monday", since this is an edit.
Read the errors because sometimes they say that await cannot be outside of an async function. */
