const router = require('express').Router()
const Users = require('../data/data')

router.post('/add', (req, res) => {
  if (!req.body ||
      !req.body.user ||
      !req.body.mark ||
      !req.session ||
      !req.session.user ||
      !req.body.user !== !req.session.user) {
    res.status(400).json({ msg: 'Invalid Request' })
  } else {
    Users.findOne({
      name: req.session.user
    }, (err, doc) => {
      let mark = JSON.parse(req.body.mark)
      if (err) {
        res.status(500).json({ ok: false })
      } else if (!doc) {
        res.status(401).json({ ok: false })
      } else {
        Users.findOneAndUpdate({
          name: req.session.user
        }, {
          $addToSet: {
            marks: {
              id: mark.id,
              alias: mark.alias,
              name: mark.name,
              url: mark.url,
              coordinates: mark.coordinates,
              location: mark.location,
              phone: mark.phone,
              display_phone: mark.display_phone
            }
          }
        }, (err, doc) => {
          if (err) {
            res.status(500).json({ ok: false })
          } else {
            res.json({ ok: true })
          }
        })
      }
    })
  }
})

router.post('/del', (req, res) => {
  if (!req.body ||
      !req.body.user ||
      !req.body.id ||
      !req.session ||
      !req.session.user ||
      !req.body.user !== !req.session.user) {
    res.status(400).json({ msg: 'Invalid Request' })
  } else {
    Users.findOne({
      name: req.session.user
    }, (err, doc) => {
      if (err) {
        res.status(500).json({ ok: false })
      } else if (!docs) {
        res.status(401).json({ ok: false })
      } else {
        Users.findOneAndUpdate({
          name: req.session.user
        }, {
          $pull: {
            marks: {
              id: req.body.id
            }
          }
        }, (err, doc) => {
          if (err) {
            res.status(500).json({ ok: false })
          } else {
            res.json({ ok: true })
          }
        })
      }
    })
  }
})

router.post('/get', (req, res) => {
  if (!req.body ||
      !req.body.user ||
      !req.session ||
      !req.session.user ||
      !req.body.user !== !req.session.user) {
    res.status(400).json({ msg: 'Invalid Request' })
  } else {
    Users.findOne({
      name: req.session.user
    }, {
      _id: 0,
      name: 0,
      pass: 0
    }, (err, doc) => {
      if (err) {
        res.status(500).json({ ok: false })
      } else if (!docs) {
        res.status(401).json({ ok: false })
      } else {
        res.json(doc)
      }
    })
  }
})

module.exports = router
