describe('test Login', () => {
    let page;
    beforeAll(async () => {
        // 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
        page = await program.reLaunch('/pages/login/index');
        await page.waitFor(1000);
    });

    it('check page container', async () => {
        const el = await page.$('.subtitle');
        const titleText = await el.text();
        expect(titleText).toEqual('Welcome back , Rohit thakur');
        const elBtn = await page.$('.login-tbn');
        const loginBtnText = await elBtn.text();
        expect(loginBtnText).toEqual('Login');
    });
});
