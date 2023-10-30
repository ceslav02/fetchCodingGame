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

    async getWeightResultForBarsArray(leftArray, rightArray) {
        // add bars to left bowl
        for(let i=0; i<leftArray.length; i++) {
            await GamePage.setCellBowlValue("left", i, leftArray[i]);
            await browser.pause(150);
        }

        // add bars to right bowl
        for(let i=0; i<leftArray.length; i++) {
            await GamePage.setCellBowlValue("right", i, rightArray[i]);
            await browser.pause(150);
        }

        await browser.pause(750);
        await GamePage.clickWeighBtn();
        await browser.waitUntil(async ()=>await GamePage.btnResult.getText()!=='?', 
        {
            timeout:3000,
            timeoutMsg:"expected text to be different after 3 seconds"
        })
        return await GamePage.getBtnResultValue();
    }

    async setCellBowlValue(bowlPart, bowlCellNumber, cellValue) {
        await GamePage.setCellBowlValue(bowlPart, bowlCellNumber, cellValue);
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

    async selectTwoBarsFromArrayAndGetWeightResultForIt(result, barsArray) {
        if(result === "=") {
            result = await this.getWeightResultForTwoBars(barsArray[4], barsArray[5]);
            return await this.selectAndClickOneCoinObject(result, barsArray[4], barsArray[5]);
        }
        else if(result === ">") {
            result = await this.getWeightResultForTwoBars(barsArray[2], barsArray[3]);
            return await this.selectAndClickOneCoinObject(result, barsArray[2], barsArray[3]);
        }
        else if(result === "<") {
            result = await this.getWeightResultForTwoBars(barsArray[0], barsArray[1]);
            return await this.selectAndClickOneCoinObject(result, barsArray[0], barsArray[1]);
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

    async selectAndClickOneCoinObject(result, coin_1, coin_2) {
        if(result === ">") {
            await GamePage.clickCoinObject(coin_2);
            return coin_2;
        }
        else if(result === "<") {
            await GamePage.clickCoinObject(coin_1);
            return coin_1;
        }
    }

    async selectFromArrayOfCoinsAndClickOneCoinObject(partBars) {
        let result;
        if(partBars.length == 6) {
            result = await this.getWeightResultForBarsArray([partBars[0], partBars[1]], [partBars[2], partBars[3]]);
            await GamePage.clickResetBtn();

                if(result === "=") { 
                    result = await this.getWeightResultForBarsArray([partBars[4]], [partBars[5]]);
                    return await this.selectAndClickOneCoinObject(result, partBars[4], partBars[5]); 
                }
                else if(result === ">") { 
                    result = await this.getWeightResultForBarsArray([partBars[2]], [partBars[3]]);
                    return await this.selectAndClickOneCoinObject(result, partBars[2], partBars[3]);
                }
                else if(result === "<") {
                    result = await this.getWeightResultForBarsArray([partBars[0]], [partBars[1]]);
                    return await this.selectAndClickOneCoinObject(result, partBars[0], partBars[1]);
                }  
        }
        else if(partBars.length == 5) {
            result = await this.getWeightResultForBarsArray([partBars[0], partBars[1]], [partBars[2], partBars[3]]);
            await GamePage.clickResetBtn();

                if(result === "=") { 
                    await GamePage.clickCoinObject(partBars[4]);
                    return partBars[4]; 
                }
                else if(result === ">") { 
                    result = await this.getWeightResultForBarsArray([partBars[2]], [partBars[3]]);
                    return await this.selectAndClickOneCoinObject(result, partBars[2], partBars[3]);
                }
                else if(result === "<") {
                    result = await this.getWeightResultForBarsArray([partBars[0]], [partBars[1]]);
                    return await this.selectAndClickOneCoinObject(result, partBars[0], partBars[1]);
                }  
        }
        else if(partBars.length == 4) {
            result = await this.getWeightResultForBarsArray([partBars[0], partBars[1]], [partBars[2], partBars[3]]);
            await GamePage.clickResetBtn();

                if(result === ">") { 
                    result = await this.getWeightResultForBarsArray([partBars[2]], [partBars[3]]);
                    return await this.selectAndClickOneCoinObject(result, partBars[2], partBars[3]);
                }
                else if(result === "<") {
                    result = await this.getWeightResultForBarsArray([partBars[0]], [partBars[1]]);
                    return await this.selectAndClickOneCoinObject(result, partBars[0], partBars[1]);
                }              
        }
        else if(partBars.length == 3) {
            result = await this.getWeightResultForBarsArray([partBars[0]], [partBars[1]]);
            await GamePage.clickResetBtn();

                if(result === "=") { 
                    await GamePage.clickCoinObject(partBars[2]);
                    return partBars[2]; 
                }
                else if(result === ">") { 
                    await GamePage.clickCoinObject(partBars[1]);
                    return partBars[1]; 
                }
                else if(result === "<") {
                    await GamePage.clickCoinObject(partBars[0]);
                    return partBars[0]; 
                }    
        }
        else if(partBars.length == 2) {
            result = await this.getWeightResultForBarsArray([partBars[0]], [partBars[1]]);
            await GamePage.clickResetBtn();

                if(result === ">") { 
                    await GamePage.clickCoinObject(partBars[1]);
                    return partBars[1]; 
                }
                else if(result === "<") {
                    await GamePage.clickCoinObject(partBars[0]);
                    return partBars[0]; 
                }
        }
        else if(partBars.length == 1) {
            await GamePage.clickCoinObject(partBars[0]);
            return partBars[0]; 
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

    async getFirstOneThirdPartOfBars(initialArray) {
        return initialArray.slice(0, Math.floor(initialArray.length / 3));
    }

    async getSecondOneThirdPartOfBars(initialArray) {
        return initialArray.slice(Math.floor(initialArray.length / 3), Math.floor(initialArray.length / 3) * 2);
    }

    async getThirdOneThirdPartPlusOfBars(initialArray) {
        return initialArray.slice(Math.floor(initialArray.length / 3) * 2, initialArray.length);
    }

    async getNumberOfDivision(initialArray) {
        let numberOfDivisions = 0;
        let initialArraylength = initialArray.length;
             while(initialArraylength > 5) {
                 initialArraylength /= 3;
                 numberOfDivisions += 1;
             }
        return numberOfDivisions;
    }
}

export default new GameFunctions();