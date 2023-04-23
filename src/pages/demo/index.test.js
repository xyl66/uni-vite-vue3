describe('test demo', () => {
    let page;
    beforeAll(async () => {
        // 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
        page = await program.reLaunch('/pages/demo/index');
        await page.waitFor(1000);
    });

    it('check page container', async () => {
        const el = await page.$('.container');
        const titleText = await el.text();
        expect(titleText).toEqual('页面构建中...');
    });
});
