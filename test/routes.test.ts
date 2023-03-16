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
          <style data-styled="true" data-styled-version="5.3.8">.bvGZpp{font-weight:bold;}/*!sc*/
      data-styled.g1[id="Link__LinkCmp-sc-c21fd39b-0"]{content:"bvGZpp,dqqGHD,"}/*!sc*/
      @media (max-width:767px){.bqDvgf{margin:1rem 0;font-size:1.5rem;}}/*!sc*/
      @media (min-width:768px){.bqDvgf{margin:2rem 0;font-size:2rem;}}/*!sc*/
      data-styled.g2[id="PageTitle-sc-6479891d-0"]{content:"bqDvgf,"}/*!sc*/
      .fxbHAk{color:rgb(0,0,143);font-size:1.75rem;}/*!sc*/
      @media (min-width:768px){.fxbHAk{text-align:center;font-size:2.25rem;}}/*!sc*/
      data-styled.g3[id="PageTitle__StyledPageTitle-sc-6479891d-1"]{content:"fxbHAk,"}/*!sc*/
      .bLpLVf{color:red;}/*!sc*/
      data-styled.g4[id="Cmp-sc-4e3bc353-0"]{content:"bLpLVf,"}/*!sc*/
      </style>
        </head>
        <body>
          <div id="react-app"><!--$--><h1 class="PageTitle-sc-6479891d-0 PageTitle__StyledPageTitle-sc-6479891d-1 bqDvgf fxbHAk">Fast Refresh Express</h1><a class="Link__LinkCmp-sc-c21fd39b-0 bvGZpp" href="/">Link to Top</a><br/><br/><a class="Link__LinkCmp-sc-c21fd39b-0 dqqGHD" href="/page">Link to Page</a><br/><br/><!--$--><div data-testid="content" class="Cmp-sc-4e3bc353-0 bLpLVf">TOP</div><!--/$--><!--/$--><script src="/main.js" async=""></script><script src="/runtime~main.js" async=""></script></div>
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
          <style data-styled="true" data-styled-version="5.3.8">.bvGZpp{font-weight:bold;}/*!sc*/
      data-styled.g1[id="Link__LinkCmp-sc-c21fd39b-0"]{content:"dqqGHD,bvGZpp,"}/*!sc*/
      @media (max-width:767px){.bqDvgf{margin:1rem 0;font-size:1.5rem;}}/*!sc*/
      @media (min-width:768px){.bqDvgf{margin:2rem 0;font-size:2rem;}}/*!sc*/
      data-styled.g2[id="PageTitle-sc-6479891d-0"]{content:"bqDvgf,"}/*!sc*/
      .fxbHAk{color:rgb(0,0,143);font-size:1.75rem;}/*!sc*/
      @media (min-width:768px){.fxbHAk{text-align:center;font-size:2.25rem;}}/*!sc*/
      data-styled.g3[id="PageTitle__StyledPageTitle-sc-6479891d-1"]{content:"fxbHAk,"}/*!sc*/
      .bLpLVf{color:red;}/*!sc*/
      data-styled.g4[id="Cmp-sc-4e3bc353-0"]{content:"bLpLVf,"}/*!sc*/
      </style>
        </head>
        <body>
          <div id="react-app"><!--$--><h1 class="PageTitle-sc-6479891d-0 PageTitle__StyledPageTitle-sc-6479891d-1 bqDvgf fxbHAk">Fast Refresh Express</h1><a class="Link__LinkCmp-sc-c21fd39b-0 dqqGHD" href="/">Link to Top</a><br/><br/><a class="Link__LinkCmp-sc-c21fd39b-0 bvGZpp" href="/page">Link to Page</a><br/><br/><!--$--><div data-testid="content" class="Cmp-sc-4e3bc353-0 bLpLVf">PAGE</div><!--/$--><!--/$--><script src="/main.js" async=""></script><script src="/runtime~main.js" async=""></script></div>
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
