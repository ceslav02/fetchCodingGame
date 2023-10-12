import GameFunctions from '../Funs/game.funs.js'
import GamePage from '../pageobjects/game.page.js'
import ReportFunctions from '../Funs/report.funs.js'

describe('Coding Game', () => {
    it('should find the fake gold bar', async () => {
        //Open tested web page
        await GamePage.open();
        await expect(browser).toHaveTitle('React App');
        await GamePage.clickResetBtn();

        //Get weight result for first six bars
        let result = await GameFunctions.getWeightResultForSixBars("0", "1", "2", "3", "4", "5");
        await GamePage.clickResetBtn();

        //Select two coins and Get fake bar
        let fakeBar = await GameFunctions.selectTwoBarsAndGetWeightResultForIt(result);

        //Verify Alert and get Alert message
        await GamePage.waitUntilAlertIsOpen();
        let alertText = await GameFunctions.getAllertText();
        await GameFunctions.acceptAllert();

        //Get list of Weighings
        let allWeighingsText = await GamePage.getAllWeighingsListItemsText();

        //Get Number of Weighing
        let numberOfWeighing = await GamePage.getNumberOfWeighing();

        //Output Alert message, Fake Bar, list of Weighings
        console.log("*********** Alert messsage is  " + alertText);
        console.log("*********** Fake Bar is  " + fakeBar);
        console.log("*********** All Weighings are  " + allWeighingsText);
        console.log("*********** Number Of Weighing is  " + numberOfWeighing);

        expect(alertText).toHaveTextContaining("Yay! You find it!");

        //Save the screenshot
        await ReportFunctions.takeBrowserScreenShot("ShouldFindFakeBar");
    })

    it('should get the Try again alert', async () => {
        let leftCoin = "0";
        let rightCoin = "1";

        //Open tested web page
        await GamePage.open();
        await expect(browser).toHaveTitle('React App');
        await GamePage.clickResetBtn();

        //Get Weight Result For Two Coins and select standart coin
        let result = await GameFunctions.getWeightResultForTwoBars(leftCoin, rightCoin);
        let pressedCoin = await GameFunctions.definePressedCoinAndClickOnIt(result, leftCoin, rightCoin);

        //Verify Alert and get Alert message
        await GamePage.waitUntilAlertIsOpen();
        let alertText = await GameFunctions.getAllertText();
        await GameFunctions.acceptAllert();

        //Output Alert message, Pressed Coin
        console.log("*********** Alert messsage is  " + alertText);
        console.log("*********** Pressed Coin is  " + pressedCoin);
        expect(alertText).toHaveTextContaining("Oops! Try Again!");

        //Save the screenshot
        await ReportFunctions.takeBrowserScreenShot("ShouldGetTryAgainAlert");
    })

    it('should get the Both sides have coin alert', async () => {
        let bothCoins = "5";

        //Open tested web page
        await GamePage.open();
        await expect(browser).toHaveTitle('React App');
        await GamePage.clickResetBtn();

        //Add same bar to left and right bowl
        await GamePage.setCellBowlValue("left", "0", bothCoins);
        await GamePage.setCellBowlValue("right", "0", bothCoins);
        await GamePage.clickWeighBtn();

        //Verify Alert and get Alert message
        await GamePage.waitUntilAlertIsOpen();
        let alertText = await GameFunctions.getAllertText();
        await GameFunctions.acceptAllert();

        //Output Alert message, Used Bar
        console.log("*********** Alert messsage is  " + alertText);
        console.log("*********** Used Bar is  " + bothCoins);
        expect(alertText).toHaveTextContaining("Inputs are invalid: Both sides have coin(s): " + bothCoins);

        //Save the screenshot
        await ReportFunctions.takeBrowserScreenShot("ShouldGetBothSidesHaveCoinAlert");
    })

    it('should get the Left side has duplicates alert', async () => {
        let duplicateCoin = "4";

        //Open tested web page
        await GamePage.open();
        await expect(browser).toHaveTitle('React App');
        await GamePage.clickResetBtn();

        //Add same bar twice to left bowl
        await GamePage.setCellBowlValue("left", "0", duplicateCoin);
        await GamePage.setCellBowlValue("left", "1", duplicateCoin);
        await GamePage.clickWeighBtn();

        //Verify Alert and get Alert message
        await GamePage.waitUntilAlertIsOpen();
        let alertText = await GameFunctions.getAllertText();
        await GameFunctions.acceptAllert();

        //Output Alert message, Duplicate Bar
        console.log("*********** Alert messsage is  " + alertText);
        console.log("*********** Left Bowl - Duplicate Bar is  " + duplicateCoin);
        expect(alertText).toHaveTextContaining("Inputs are invalid: Left side has duplicates");

        //Save the screenshot
        await ReportFunctions.takeBrowserScreenShot("ShouldGetLeftSideHasDuplicatesAlert");
    })

    it('should get the Right side has duplicates alert', async () => {
        let duplicateCoin = "7";

        //Open tested web page
        await GamePage.open();
        await expect(browser).toHaveTitle('React App');
        await GamePage.clickResetBtn();

        //Add same bar twice to right bowl
        await GamePage.setCellBowlValue("right", "0", duplicateCoin);
        await GamePage.setCellBowlValue("right", "1", duplicateCoin);
        await GamePage.clickWeighBtn();

        //Verify Alert and get Alert message
        await GamePage.waitUntilAlertIsOpen();
        let alertText = await GameFunctions.getAllertText();
        await GameFunctions.acceptAllert();

        //Output Alert message, Duplicate Bar
        console.log("*********** Alert messsage is  " + alertText);
        console.log("*********** Right Bowl - Duplicate Bar is  " + duplicateCoin);
        expect(alertText).toHaveTextContaining("Inputs are invalid: Right side has duplicates");

        //Save the screenshot
        await ReportFunctions.takeBrowserScreenShot("ShouldGetRightSideHasDuplicatesAlert");
    })
})

