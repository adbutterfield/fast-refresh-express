import supertest from "supertest";
import { JSDOM } from "jsdom";
import app from "../server/app";

describe("routes", () => {
  it("GET / returns server rendered page", async () => {
    const agent = supertest(app);
    const response = await agent.get("/");
    // Verify the markup
    expect(response.text).toMatchInlineSnapshot(`
      "<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Fast Refresh Express</title>
          <link rel="shortcut icon" href="/favicon.ico" />
          <style data-styled="true" data-styled-version="5.3.8">.bsdqOy{font-weight:bold;}/*!sc*/
      data-styled.g1[id="sc-c21fd39b-0"]{content:"bsdqOy,ZHDU,"}/*!sc*/
      .cHqnac{color:red;}/*!sc*/
      data-styled.g2[id="sc-4e3bc353-0"]{content:"cHqnac,"}/*!sc*/
      </style>
        </head>
        <body>
          <div id="react-app"><!--$--><a class="sc-c21fd39b-0 bsdqOy" href="/">Link to Top</a><br/><br/><a class="sc-c21fd39b-0 ZHDU" href="/page">Link to Page</a><br/><br/><!--$--><div data-testid="content" class="sc-4e3bc353-0 cHqnac">TOP</div><!--/$--><!--/$--><script src="/main.js" async=""></script><script src="/runtime~main.js" async=""></script></div>
        </body>
      </html>"
    `);
    const dom = new JSDOM(response.text);
    const content = dom.window.document.querySelector('[data-testid="content"');
    // Verify SSR rendered the correct page
    expect(content?.innerHTML).toEqual("TOP");

    const style = dom.window.document.getElementsByTagName("style");
    // Verify SSR rendered the correct styles
    expect(/color:red;/.test(style[0].innerHTML)).toBe(true);
    expect(/font-weight:bold;/.test(style[0].innerHTML)).toBe(true);
  });

  it("GET /page returns server rendered page", async () => {
    const agent = supertest(app);
    const response = await agent.get("/page");
    // Verify the markup
    expect(response.text).toMatchInlineSnapshot(`
      "<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Fast Refresh Express</title>
          <link rel="shortcut icon" href="/favicon.ico" />
          <style data-styled="true" data-styled-version="5.3.8">.bsdqOy{font-weight:bold;}/*!sc*/
      data-styled.g1[id="sc-c21fd39b-0"]{content:"ZHDU,bsdqOy,"}/*!sc*/
      .cHqnac{color:red;}/*!sc*/
      data-styled.g2[id="sc-4e3bc353-0"]{content:"cHqnac,"}/*!sc*/
      </style>
        </head>
        <body>
          <div id="react-app"><!--$--><a class="sc-c21fd39b-0 ZHDU" href="/">Link to Top</a><br/><br/><a class="sc-c21fd39b-0 bsdqOy" href="/page">Link to Page</a><br/><br/><!--$--><div data-testid="content" class="sc-4e3bc353-0 cHqnac">PAGE</div><!--/$--><!--/$--><script src="/main.js" async=""></script><script src="/runtime~main.js" async=""></script></div>
        </body>
      </html>"
    `);

    const dom = new JSDOM(response.text);
    const content = dom.window.document.querySelector('[data-testid="content"');
    // Verify SSR rendered the correct page
    expect(content?.innerHTML).toEqual("PAGE");

    const style = dom.window.document.getElementsByTagName("style");
    // Verify SSR rendered the correct styles
    expect(/color:red;/.test(style[0].innerHTML)).toBe(true);
    expect(/font-weight:bold;/.test(style[0].innerHTML)).toBe(true);
  });
});
