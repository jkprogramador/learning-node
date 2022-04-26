const puppeteer = require('puppeteer')

const portfinder = require('portfinder')

const app = require('../meadowlark')

let port = null

let server = null

beforeEach(async () => {
    port = await portfinder.getPortPromise()
    server = app.listen(port)
})

afterEach(() => {
    server.close()
})

test('home page links to another page', async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--disable-setuid-sandbox",
            "--no-sandbox",
        ]
    })
    const page = await browser.newPage()
    await page.goto(`http://localhost:${port}`)
    await Promise.all([
        page.waitForNavigation(),
        page.click('[data-test-id="about"]'),
    ])

    expect(page.url()).toBe(`http://localhost:${port}/about`)
    await browser.close()
})