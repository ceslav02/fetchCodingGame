import { browser } from '@wdio/globals'

export default class Page20 {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        return browser.url(`http://sdetchallenge.fetch.com/?coins=20`);
    }
}