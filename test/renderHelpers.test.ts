/**
 * Example of how to mock/spy on a named export
 */
import { getBootstrapScript } from "../server/renderHelpers";

jest.mock("../server/renderHelpers", () => {
  const originalModule = jest.requireActual("../server/renderHelpers");

  return {
    ...originalModule,
    getBootstrapScript: jest.fn(() => null),
  };
});

describe("mocked named export", () => {
  test("it returns the mocked value", async () => {
    expect(getBootstrapScript()).toEqual(null);
    expect(getBootstrapScript).toHaveBeenCalledTimes(1);
    (getBootstrapScript as jest.Mock<unknown>).mockImplementationOnce(() => 42);
    // @ts-ignore getBootstrapScript actually accepts no arguments
    expect(getBootstrapScript(null)).toEqual(42);
    expect(getBootstrapScript).toHaveBeenCalledTimes(2);
    expect(getBootstrapScript).toHaveBeenCalledWith(null);
  });
});
