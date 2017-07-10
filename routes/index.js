const router = require('express').Router()
const request = require('request')
const cheerio = require('cheerio')
const igdb = require('../config/igdb')


router.get('/latest', (req, res) => {
    getPage('http://me.ign.com/ar/article/review/')
        .then($ => {
            $('#content > ul.tbl > li').map((i, li) => {
                return res.send({
                    thumbnail: $('div > a', li).attr('href'),
                    title: $('h2 > a', li).text(),
                    date: Date($('time', li).attr('datetime')),
                    rating: $('span', li).text()
                })
            })
        })
        .catch(console.log)
})

router.get('/search', (req, res) => {
    igdb.games({
        fields: 'name',
        search: 'last',
        limit: '10'
    })
        .then(response => {
            return res.send(response.body)
        }).catch(error => {
            throw error;
        })
})

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

module.exports = [router]
