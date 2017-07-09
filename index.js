const request = require('request')
const cheerio = require('cheerio')
const RapidAPI = new require('rapidapi-connect');
const rapid = new RapidAPI('default-application_59622be5e4b03a5acfb1e6e8', '063d278c-f1d6-4f64-9fc1-8ee46e0f603c')

exports.latest = (event, context, callback) => {
    getPage('http://me.ign.com/ar/article/review/')
        .then($ => {
            $('#content > ul.tbl > li').map((i, li) => {
                return callback(null, {
                    thumbnail: $('div > a', li).attr('href'),
                    title: $('h2 > a', li).text(),
                    date: Date($('time', li).attr('datetime')),
                    rating: $('span', li).text()
                })
            })
        })
        .catch(console.log)
}

exports.search = (event, context, callback) => {
    getPage(`http://me.ign.com/ar/se/?type=review&q=${event.key}&order_by=-date&model=article&x=0&y=0`)
        .then($ => {
            $('#content > ul.blogroll > li').map((i, li) => {
                return callback(null, {
                    thumbnail: $('div > a', li).attr('href'),
                    title: $('h3 > a', li).text(),
                    date: Date($('time', li).attr('datetime')),
                    rating: $('span', li).text()
                })
            })

        })
        .catch(console.log)
}

const getPage = (url) => {
    return new Promise((resolve, reject) => {
        request(url, (err, response, body) => {
            if(err) {
                return reject(err)
            } else {
                return resolve(cheerio.load(body))
            }
        })
    })
}

//console.log(exports.latest({}, null, console.log))
//console.log(exports.search({key: 'cod'}, null, console.log))
