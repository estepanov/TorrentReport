const RssParser = require('rss-parser');

const parser = new RssParser();
parser.parseURL('https://www.torlock.com/movies/rss.xml').then(data => {
  console.log('length', data.items.length)
  console.log('sample one', data.items[0])
  console.log('enclosure', data.items[0].enclosure)
  console.log('category', data.items[0].category)
})
