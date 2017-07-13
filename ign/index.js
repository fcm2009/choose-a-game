const request = require('request')
const cheerio = require('cheerio')
const { getPage } = require('./util')


const search = name => {
    return getPage(`http://me.ign.com/ar/se/?model=keyword&q=${name}`)
        .then($ => $('#content > ul.tbl > li').map(
                (i, li) => $('article > div.td.indexBody > h2 > a', li).attr('href')
            )[0]
        )
        .catch(console.log)
}

const getRating = name => {
    search(name)
        .then()
}
