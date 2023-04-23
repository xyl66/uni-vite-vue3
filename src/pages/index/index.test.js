describe("test title", () => {
  let page;
  beforeAll(async () => {
    page = await program.currentPage();
    await page.waitFor(5000);
  });

  it("check page title", async () => {
    const el = await page.$(".title");
    const titleText = await el.text();
    expect(titleText).toEqual("Hello");
  });
});
