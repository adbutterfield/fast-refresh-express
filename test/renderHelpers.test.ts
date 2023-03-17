/**
 * Example of how to mock/spy on a named export
 */
import { getBootstrapScript } from "../server/ssr/renderHelpers";

jest.mock("../server/ssr/renderHelpers", () => {
  const originalModule = jest.requireActual("../server/ssr/renderHelpers");

  return {
    ...originalModule,
    getBootstrapScript: jest.fn(originalModule.getBootstrapScript),
  };
});

describe("mocked named export", () => {
  test("it returns the mocked value", async () => {
    expect(await getBootstrapScript()).toEqual({
      "main.js": "/main.js",
      "react_pages_Page_tsx.chunk.js": "/react_pages_Page_tsx.chunk.js",
      "react_pages_Top_tsx.chunk.js": "/react_pages_Top_tsx.chunk.js",
      "runtime~main.js": "/runtime~main.js",
    });
    expect(getBootstrapScript).toHaveBeenCalledTimes(1);
    (getBootstrapScript as jest.Mock<unknown>).mockImplementationOnce(() => 42);
    // @ts-ignore getBootstrapScript actually accepts no arguments
    expect(getBootstrapScript(null)).toEqual(42);
    expect(getBootstrapScript).toHaveBeenCalledTimes(2);
    expect(getBootstrapScript).toHaveBeenCalledWith(null);
  });
});
