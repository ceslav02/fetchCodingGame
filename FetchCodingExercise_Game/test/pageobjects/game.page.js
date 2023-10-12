import { $ } from '@wdio/globals'
import Page from './page.js';

class GamePage extends Page {
    get btnReset () {return $("//button[normalize-space()='Reset']");}
    get btnResult () {return $("//div[@class='result']//button[@id='reset']");}
    get btnWeigh () {return $("#weigh");}
    get listWeighings () {return $("//div[@class='game-info']//ol");}

    async getAllWeighingsListItemsText () {
        let list = await this.listWeighings;
        let listItems  = await list.$$('li');
        return await Promise.all(await listItems.map(item => item.getText()));
    }

    async getNumberOfWeighing () {
        let list = await this.listWeighings;
        let listItems  = await list.$$('li');
        return listItems.length;
    }

    async setCellBowlValue(bowlSide, cellIndex, cellValue) {
        let cellObject = $("#" + bowlSide + "_" + cellIndex);
        cellObject.setValue(cellValue);
    }

    async getCoinObject(coinIndex) {
        let coinObject = $("#coin_" + coinIndex);
        return await coinObject.getText();      
    }

    async getBtnResultValue() {
        let resultBtn = await this.btnResult;
        return await resultBtn.getText();
    }

    async clickResetBtn() {
        await this.btnReset.click();
    }

    async clickWeighBtn() {
        await this.btnWeigh.click();
    }

    async clickCoinObject(coinIndex) {
        let coinObject = $("#coin_" + coinIndex);
        return await coinObject.click();     
    }

    async waitUntilAlertIsOpen() {
        await browser.waitUntil(async ()=>await browser.isAlertOpen(), 
        {
            timeout:3500,
            timeoutMsg:"FAIL - Browser alert is expected!"
        })
    }
}

export default new GamePage();
