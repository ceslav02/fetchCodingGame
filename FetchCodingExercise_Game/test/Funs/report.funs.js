class ReportFunctions {
    async takeBrowserScreenShot(fileName) {
        await browser.saveScreenshot("./test/screenshots/" + fileName + ".png");
    }  
}

export default new ReportFunctions();