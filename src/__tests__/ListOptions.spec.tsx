import { cleanup, fireEvent, render } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import ListOptions from "../components/ListOptions/ListOptions";
import { genderOptions, selectedGenderOptions } from "../__mocks__/mocks";

afterEach(() => cleanup);
const onChangeMock = jest.fn();
const onCleanMock = jest.fn();

describe("List options Component", () => {
  it("render component", async () => {
    const { findAllByRole, getByText } = render(
      <ListOptions
        options={genderOptions}
        selectedOption={selectedGenderOptions}
        onChange={() => {}}
        onClear={() => {}}
      />,
    );
    const selects = await findAllByRole("option");
    expect(selects).toHaveLength(4);
    expect((selects[0] as HTMLOptionElement).selected).toBeFalsy();
    expect((getByText("Ação") as HTMLOptionElement).selected).toBeTruthy();
    expect((selects[2] as HTMLOptionElement).selected).toBeFalsy();
  });

  it.skip("on change is fired", async () => {
    const { findAllByRole } = render(
      <ListOptions
        options={genderOptions}
        selectedOption={selectedGenderOptions}
        onChange={(e: number | null) => onChangeMock(e)}
        onClear={() => console.log("chamou onClear")}
      />,
    );
    const selects = await findAllByRole("option");
    // userEvent.selectOptions(selects[1], "28");
    fireEvent.change(selects[0]);
    // fireEvent.click(selects[1]);
    expect(onChangeMock).toHaveBeenCalledWith(28);
  });

  it.skip("clean button is fired", async () => {
    const { findByRole } = render(
      <ListOptions
        options={genderOptions}
        selectedOption={selectedGenderOptions}
        onChange={() => {}}
        onClear={onCleanMock}
      />,
    );
    const button = await findByRole("button");
    fireEvent.click(button);
    expect(onChangeMock).toHaveBeenCalled();
  });
});
