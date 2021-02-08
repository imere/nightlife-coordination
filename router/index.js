import { token } from '../config/env'
import express from 'express'
import * as yelp from 'yelp-fusion'

import user from './user'
import mark from './mark'

const app = express()
const router = express.Router()

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.post('/getdata', (req, res) => {
  if (!req.body.qstr) {
    return res.status(400).json({ msg: 'Lack of Query Data' })
  } else {
    let params = Object.assign({
      term: 'nightlife'
    }, req.body.qstr)
    const client = yelp.client(token);
    client.search(params).then(response => {
      res.json(response.jsonBody);
    }).catch(e => {
      res.status(400).json(e.message);
    });
  }
})

router.use('/user', user)

router.use('/mark', mark)

export default {
  path: '/',
  handler: router
}
