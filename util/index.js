const request = require('request')
const cheerio = require('cheerio')


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


module.exports.getPage = getPage
