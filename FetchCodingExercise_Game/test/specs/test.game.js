import GameFunctions from '../Funs/game.funs.js'
import GamePage from '../pageobjects/game.page.js'
import ReportFunctions from '../Funs/report.funs.js'
import GamePage20 from '../pageobjects/game.page20.js'

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



    it('should find the fake gold bar for 20 bars', async () => {
        let firstSixBars = ["0", "1", "2", "3", "4", "5"];
        let secondSixBars = ["6","7","8","9","10","11"];
        let thirdSixBars = ["12", "13", "14", "15", "16", "17"];
        let forthTwoBars = ["18", "19"];
        let fakeBar;

        //Open tested web page
        await GamePage20.open();
        await expect(browser).toHaveTitle('React App');
        await GamePage20.clickResetBtn();

        //Get weight result for first twelve bars
        let result = await GameFunctions.getWeightResultForBarsArray(firstSixBars, secondSixBars);
        await GamePage.clickResetBtn();

        if(result === "=") {
            result = await GameFunctions.getWeightResultForBarsArray([thirdSixBars[0], thirdSixBars[1]], [thirdSixBars[2], thirdSixBars[3]]);
            await GamePage.clickResetBtn();
            fakeBar = await GameFunctions.selectTwoBarsFromArrayAndGetWeightResultForIt(result, thirdSixBars);
        }
        else if(result === ">") {
            result = await GameFunctions.getWeightResultForBarsArray([secondSixBars[0], secondSixBars[1]], [secondSixBars[2], secondSixBars[3]]);
            await GamePage.clickResetBtn();
            fakeBar = await GameFunctions.selectTwoBarsFromArrayAndGetWeightResultForIt(result, secondSixBars);
        }
        else if(result === "<") {
            result = await GameFunctions.getWeightResultForBarsArray([firstSixBars[0], firstSixBars[1]], [firstSixBars[2], firstSixBars[3]]);
            await GamePage.clickResetBtn();
            fakeBar = await GameFunctions.selectTwoBarsFromArrayAndGetWeightResultForIt(result, firstSixBars);
        }
        
        await browser.pause(1500);

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


    it('should find the fake gold bar for any number of bars', async () => {
        let fakeBar, result, firstPartBars, secondPartBars, thirdPartBars;
        //Select number of coins
        let coinsNumber = '122';

        //Open tested web page
		await browser.url(`http://sdetchallenge.fetch.com/?coins=` + coinsNumber);
		await expect(browser).toHaveTitle('React App');
        await GamePage.clickResetBtn();

        //Get initial array of all coins
        let numberOfCoins = await GamePage.getNumberOfCoins();
        let initialArray = Array.from({ length: numberOfCoins }, (_, index) => index);
        let numberOfDivisions = await GameFunctions.getNumberOfDivision(initialArray);

            for(let i=0;i<numberOfDivisions; i++) {
            //Divide all coins into three parts 
            firstPartBars = await GameFunctions.getFirstOneThirdPartOfBars(initialArray);
            secondPartBars = await GameFunctions.getSecondOneThirdPartOfBars(initialArray);
            thirdPartBars = await GameFunctions.getThirdOneThirdPartPlusOfBars(initialArray);

            //Get weight result for first third part and second third part of bars
            result = await GameFunctions.getWeightResultForBarsArray(firstPartBars, secondPartBars);
            await GamePage.clickResetBtn();

                if(result === "=") {  
                    initialArray = thirdPartBars;
                }
                else if(result === ">") { 
                    initialArray = secondPartBars;
                }
                else if(result === "<") {
                    initialArray = firstPartBars;
                }
            }

            console.log(result + "***************** firstPartBars  " + firstPartBars);
            console.log("***************** secondPartBars  " + secondPartBars);
            console.log("***************** thirdPartBars  " + thirdPartBars);

            await browser.pause(2500);

            if(result === "=") {
                fakeBar = await GameFunctions.selectFromArrayOfCoinsAndClickOneCoinObject(thirdPartBars);
            }
            else if(result === ">") {
                fakeBar = await GameFunctions.selectFromArrayOfCoinsAndClickOneCoinObject(secondPartBars);
            }
            else if(result === "<") {
                fakeBar = await GameFunctions.selectFromArrayOfCoinsAndClickOneCoinObject(firstPartBars);
            }  

            await browser.pause(2500);

            //Verify Alert and get Alert message
            await GamePage.waitUntilAlertIsOpen();
            let alertText = await GameFunctions.getAllertText();
            await GameFunctions.acceptAllert();
    
            //Get list of Weighings
            let allWeighingsText = await GamePage.getAllWeighingsListItemsText();
    
            //Get Number of Weighing
            let numberOfWeighing = await GamePage.getNumberOfWeighing();

            //Output Alert message, Fake Bar, list of Weighings
            console.log("*********** The number Of Divisions is  " + numberOfDivisions);
            console.log("*********** Alert messsage is  " + alertText);
            console.log("*********** Fake Bar is  " + fakeBar);
            console.log("*********** All Weighings are  " + allWeighingsText);
            console.log("*********** Number Of Weighing is  " + numberOfWeighing);
    
            expect(alertText).toHaveTextContaining("Yay! You find it!");
    
            //Save the screenshot
            await ReportFunctions.takeBrowserScreenShot("ShouldFindFakeBar_AnyNumber");
    })


})

