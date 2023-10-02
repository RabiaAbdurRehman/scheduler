import React from "react";
import {
  render,
  waitForElement,
  getAllByTestId,
  getByText,
  queryByText,
  getByAltText,
  fireEvent,
  getByTestId,
  cleanup,
  getAllByText,
} from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";

describe("Appointment Component Tests", () => {
  afterEach(cleanup);

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    // Render the Application
    const { container } = render(<Application />);

    // Load the data  and trigger the edit
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));

    // Change the name and save the appointment
    fireEvent.change(getByTestId(appointment, "student-name-input"), {
      target: { value: "New Student Name" },
    });
    fireEvent.click(queryByText(appointment, "Save"));
    // Check if the error message is displayed.

    // Check that the "Saving" indicator is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Wait until the error message shows
    await waitForElement(() => getByText(appointment, "Error"));

    // Check that the error message was displayed.
    expect(
      getByText(appointment, "Could not book appointment.")
    ).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    // Render the Application
    const { container } = render(<Application />);

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
    const addButton = await waitForElement(() =>
      getAllByTestId(container, "addButton")
    );

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    // Wait until the error message shows
    await waitForElement(() => getByText(appointment, "Error"));

    // Check that the error message was displayed.
    expect(
      getByText(appointment, "Could not cancel appointment.")
    ).toBeInTheDocument();
  });
});
