import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ListOptions from "../components/ListOptions/ListOptions";
import { genderOptions, selectedGenderOptions } from "../__mocks__/mocks";

afterEach(() => cleanup);
const onChangeMock = jest.fn();
const onCleanMock = jest.fn();

beforeEach(() => {
  render(
    <ListOptions
      options={genderOptions}
      selectedOption={selectedGenderOptions}
      onChange={(e: number | null) => onChangeMock(e)}
      onClear={onCleanMock}
    />,
  );
});

describe("List options Component", () => {
  it("render component", async () => {
    const { findAllByRole, getByText } = screen;

    const selects = await findAllByRole("option");
    expect(selects).toHaveLength(4);
    expect((selects[0] as HTMLOptionElement).selected).toBeFalsy();
    expect((getByText("Ação") as HTMLOptionElement).selected).toBeTruthy();
    expect((selects[2] as HTMLOptionElement).selected).toBeFalsy();
  });

  it("on change is fired when selected value is 28", async () => {
    const { findByRole } = screen;

    const selects = await findByRole("combobox");
    screen.debug(selects);
    fireEvent.change(selects, { target: { value: "28" } });
    expect(onChangeMock).toHaveBeenCalledWith(28);
  });

  it("on change is fired when selected value is default", async () => {
    const { findByRole } = screen;

    const selects = await findByRole("combobox");
    screen.debug(selects);
    fireEvent.change(selects, { target: { value: "default" } });
    expect(onChangeMock).toHaveBeenCalledWith(null);
  });

  it("clean button is fired", async () => {
    const { findByRole } = screen;
    const button = await findByRole("button");
    fireEvent.click(button);
    expect(onCleanMock).toHaveBeenCalled();
  });
});
