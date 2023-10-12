import GamePage from '../pageobjects/game.page.js'

class GameFunctions {
    async getWeightResultForSixBars(leftCoin_1, leftCoin_2, leftCoin_3, rightCoin_1, rightCoin_2, rightCoin_3) {
        await GamePage.setCellBowlValue("left", "0", leftCoin_1);
        await GamePage.setCellBowlValue("left", "1", leftCoin_2);
        await GamePage.setCellBowlValue("left", "2", leftCoin_3);
        await GamePage.setCellBowlValue("right", "0", rightCoin_1);
        await GamePage.setCellBowlValue("right", "1", rightCoin_2);
        await GamePage.setCellBowlValue("right", "2", rightCoin_3);
        
        await GamePage.clickWeighBtn();
        await GamePage.listWeighings.waitForDisplayed();
        return await GamePage.getBtnResultValue();
    }

    async selectTwoBarsAndGetWeightResultForIt(result) {
        if(result === "=") {
            result = await this.getWeightResultForTwoBars("6", "7");
            return await this.selectAndClickCoinObject(result, "6", "7", "8");
        }
        else if(result === ">") {
            result = await this.getWeightResultForTwoBars("3", "4");
            return await this.selectAndClickCoinObject(result, "3", "4", "5");
        }
        else if(result === "<") {
            result = await this.getWeightResultForTwoBars("0", "1");
            return await this.selectAndClickCoinObject(result, "0", "1", "2");
        }
    }

    async getWeightResultForTwoBars(leftCoin, rightCoin) {
        await GamePage.setCellBowlValue("left", "0", leftCoin);
        await GamePage.setCellBowlValue("right", "0", rightCoin);
        await GamePage.clickWeighBtn();

            await browser.waitUntil(async ()=>await GamePage.btnResult.getText()!=='?', 
            {
                timeout:3000,
                timeoutMsg:"expected text to be different after 3 seconds"
            })

        return await GamePage.getBtnResultValue();
    }

    async selectAndClickCoinObject(result, coin_1, coin_2, coin_3) {
        if(result === "=") {
            await GamePage.clickCoinObject(coin_3);
            return coin_3;
        }
        else if(result === ">") {
            await GamePage.clickCoinObject(coin_2);
            return coin_2;
        }
        else if(result === "<") {
            await GamePage.clickCoinObject(coin_1);
            return coin_1;
        }
    }

    async definePressedCoinAndClickOnIt (result, leftCoin, rightCoin) {
        if(result === "=" || result === ">") {
            await GamePage.clickCoinObject(leftCoin);
            return leftCoin;
        }
        else {
            await GamePage.clickCoinObject(rightCoin);
            return rightCoin;
        }
    }

    async getAllertText() {
        if (browser.isAlertOpen()) {
            let alertText = await browser.getAlertText();
            return alertText;
        }
    }
    async acceptAllert() {
        if (browser.isAlertOpen()) {
            await browser.acceptAlert();
        }
    }
}

export default new GameFunctions();