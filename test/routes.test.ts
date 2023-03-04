import supertest from "supertest";
import { JSDOM } from "jsdom";
import app from "../server/app";

describe("routes", () => {
  it("GET / returns server rendered page", async () => {
    const agent = supertest(app);

    const response = await agent.get("/");

    const dom = new JSDOM(response.text);
    const content = dom.window.document.querySelector('[data-testid="content"');
    expect(content?.innerHTML).toEqual("TOP");

    const style = dom.window.document.getElementsByTagName("style");
    expect(/color:red;/.test(style[0].innerHTML)).toBe(true);
    expect(/font-weight:bold;/.test(style[0].innerHTML)).toBe(true);
  });

  it("GET /page returns server rendered page", async () => {
    const agent = supertest(app);

    const response = await agent.get("/page");
    const dom = new JSDOM(response.text);
    const content = dom.window.document.querySelector('[data-testid="content"');
    expect(content?.innerHTML).toEqual("PAGE");

    const style = dom.window.document.getElementsByTagName("style");
    expect(/color:red;/.test(style[0].innerHTML)).toBe(true);
    expect(/font-weight:bold;/.test(style[0].innerHTML)).toBe(true);
  });
});
