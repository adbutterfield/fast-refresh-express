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
          <style data-styled="true" data-styled-version="5.3.9">.gCRJcT{font-weight:bold;}/*!sc*/
      data-styled.g1[id="Link__LinkCmp-sc-19ap5pz-0"]{content:"gCRJcT,"}/*!sc*/
      @media (max-width:767px){.hYSwJc{margin:1rem 0;font-size:1.5rem;}}/*!sc*/
      @media (min-width:768px){.hYSwJc{margin:2rem 0;font-size:2rem;}}/*!sc*/
      data-styled.g2[id="PageTitle-sc-10824m2-0"]{content:"hYSwJc,"}/*!sc*/
      .kwqGsj{color:rgb(0,0,143);font-size:1.75rem;}/*!sc*/
      @media (min-width:768px){.kwqGsj{text-align:center;font-size:2.25rem;}}/*!sc*/
      data-styled.g3[id="PageTitle__StyledPageTitle-sc-10824m2-1"]{content:"kwqGsj,"}/*!sc*/
      .ioTYJi{color:red;}/*!sc*/
      data-styled.g4[id="Cmp-sc-ysn75t-0"]{content:"ioTYJi,"}/*!sc*/
      </style>
        </head>
        <body>
          <div id="react-app"><!--$--><h1 class="PageTitle-sc-10824m2-0 PageTitle__StyledPageTitle-sc-10824m2-1 hYSwJc kwqGsj">Fast Refresh Express</h1><a class="Link__LinkCmp-sc-19ap5pz-0 gCRJcT" href="/">Link to Top</a><br/><br/><a class="Link__LinkCmp-sc-19ap5pz-0" href="/page">Link to Page</a><br/><br/><!--$--><div data-testid="content" class="Cmp-sc-ysn75t-0 ioTYJi">TOP</div><!--/$--><!--/$--><script src="/main.js" async=""></script><script src="/runtime~main.js" async=""></script></div>
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
          <style data-styled="true" data-styled-version="5.3.9">.gCRJcT{font-weight:bold;}/*!sc*/
      data-styled.g1[id="Link__LinkCmp-sc-19ap5pz-0"]{content:"gCRJcT,"}/*!sc*/
      @media (max-width:767px){.hYSwJc{margin:1rem 0;font-size:1.5rem;}}/*!sc*/
      @media (min-width:768px){.hYSwJc{margin:2rem 0;font-size:2rem;}}/*!sc*/
      data-styled.g2[id="PageTitle-sc-10824m2-0"]{content:"hYSwJc,"}/*!sc*/
      .kwqGsj{color:rgb(0,0,143);font-size:1.75rem;}/*!sc*/
      @media (min-width:768px){.kwqGsj{text-align:center;font-size:2.25rem;}}/*!sc*/
      data-styled.g3[id="PageTitle__StyledPageTitle-sc-10824m2-1"]{content:"kwqGsj,"}/*!sc*/
      .ioTYJi{color:red;}/*!sc*/
      data-styled.g4[id="Cmp-sc-ysn75t-0"]{content:"ioTYJi,"}/*!sc*/
      </style>
        </head>
        <body>
          <div id="react-app"><!--$--><h1 class="PageTitle-sc-10824m2-0 PageTitle__StyledPageTitle-sc-10824m2-1 hYSwJc kwqGsj">Fast Refresh Express</h1><a class="Link__LinkCmp-sc-19ap5pz-0" href="/">Link to Top</a><br/><br/><a class="Link__LinkCmp-sc-19ap5pz-0 gCRJcT" href="/page">Link to Page</a><br/><br/><!--$--><div data-testid="content" class="Cmp-sc-ysn75t-0 ioTYJi">PAGE</div><!--/$--><!--/$--><script src="/main.js" async=""></script><script src="/runtime~main.js" async=""></script></div>
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
