const puppeteer = require('puppeteer')

let scrape = async () => {
  console.log('entering scrape...')
  var browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const page = await browser.newPage()
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A'
  )
  await page.setViewport({ width: 1300, height: 1300 })
  await page.setRequestInterception(true)
  page.on('request', interceptedRequest => {
    if (
      !interceptedRequest.url().includes('rarbg.to') ||
      interceptedRequest.url().endsWith('.png') ||
      interceptedRequest.url().endsWith('.jpg') ||
      interceptedRequest.url().endsWith('.mp3') ||
      interceptedRequest.url().endsWith('.css') ||
      interceptedRequest.url().endsWith('.mp4') ||
      interceptedRequest.url().endsWith('.gif')
    ) {
      console.log('blocking resource ->', interceptedRequest.url())
      interceptedRequest.abort()
    } else {
      console.log('ALLOWING resource ->', interceptedRequest.url())
      interceptedRequest.continue()
    }
  })
  await page.goto(
    'https://rarbg.to/top100.php?category%5B%5D=14&category%5B%5D=48&category%5B%5D=17&category%5B%5D=44&category%5B%5D=45&category%5B%5D=47&category%5B%5D=50&category%5B%5D=51&category%5B%5D=52&category%5B%5D=42&category%5B%5D=46&category%5B%5D=49',
    {
      timeout: 100000
    }
  )
  console.log('start wait')
  await page.waitFor(3000)
  console.log('end wait')
  const result = await page.evaluate(() => {
    console.log('hello from evaluate')
    let title = document.querySelectorAll(
      'body > table:nth-child(6) > tbody > tr > td:nth-child(2) > div > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > a:nth-child(1)'
    )
    return Array.from(title).map(elem => {
      return elem.outerText
    })
  })
  browser.close()
  return result
}

module.exports = scrape
