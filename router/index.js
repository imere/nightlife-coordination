const { token } = require('../config/token')
const express = require('express')
const router = express.Router()
const app = express()
const yelp = require('yelp-fusion')

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.use('/getdata', (req, res) => {
  if (!req.body.qstr) {
    return response.status(400).json({ ok: false })
  } else {
    let params = Object.assign({
      term: 'nightpub'
    }, req.body.qstr)
    const client = yelp.client(token);
    client.search(params).then(response => {
      res.json(response.jsonBody);
    }).catch(e => {
      res.status(400).json(e.message);
    });
  }
})

module.exports = {
  path: '/',
  handler: router
}
