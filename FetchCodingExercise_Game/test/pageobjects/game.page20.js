import { $ } from '@wdio/globals'
import Page20 from './page_20.js';

class GamePage20 extends Page20 {
    get btnReset () {return $("//button[normalize-space()='Reset']");}
    get btnResult () {return $("//div[@class='result']//button[@id='reset']");}
    get btnWeigh () {return $("#weigh");}
    get listWeighings () {return $("//div[@class='game-info']//ol");}

    async clickResetBtn() {
        await this.btnReset.click();
    }
}

export default new GamePage20();