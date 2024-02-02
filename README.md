# DOM Snapshots
Creates DOM snapshots used for e2e testing, or something else

## Usage
> We will use Puppeteer project for example

```javascript
const domSnapshots = require('dom-snapshots');
const puppeteer = require('puppeteer');

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto('https://www.danijel.net');

const bodyHandle = await page.evaluateHandle(() => document.body);
const resultHandle = await page.evaluateHandle(domSnapshots, bodyHandle);
console.log(await resultHandle.jsonValue());
await resultHandle.dispose();

await browser.close();
```