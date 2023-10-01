import {
  render,
  getByAltText,
  getByText,
  getAllByTestId,
  queryByAltText,
  queryByText,
  waitForElement,
  fireEvent,
} from "@testing-library/react";

import Application from "components/Application";
import React from "react";
import axios from "__mocks__/axios";

it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    (appointment) => queryByText(appointment, "Archie Cohen")
  );
  fireEvent.click(getByAltText(appointment, "Delete"));

  // 4. Check that the confirmation message is shown.
  expect(
    getByText(appointment, "Are you sure you would like to delete?")
  ).toBeInTheDocument();

  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(queryByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find((day) =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  // debug();
});

/**1. Render the Application.
  // 2. Wait until the text "Archie Cohen" is displayed.
  // 3. Click the "Delete" button on the booked appointment.
  // 4. Check that the confirmation message is shown.
  // 5. Click the "Confirm" button on the confirmation. {App doesnt have confirmation functionality.}
  // 6. Check that the element with the text "Deleting" is displayed.
  // 7. Wait until the element with the "Add" button is displayed.
  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining". */
