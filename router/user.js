const router = require('express').Router()
const Users = require('../data/data')

router.post('/register', (req, res) => {
  if (!req.body ||
      !req.body.user ||
      !req.body.pass) {
    res.status(400).json({ ok: false })
  } else if (!/^[a-zA-Z]{1}[0-9a-zA-Z]{4,9}$/.test(req.body.user) ||
             !/^[0-9a-zA-Z]{5,15}$/.test(req.body.pass)) {
    res.status(400).json({ msg: 'Bad Format' })
  } else {
    Users.findOne({
      name: req.body.user
    }, (err, docs) => {
      if (err) {
        res.status(500).json({ ok: false })
      } else if (docs) {
        res.status(400).json({ msg: 'user exists' })
      } else {
        const user = new Users({
          name: req.body.user,
          pass: req.body.pass,
          marks: []
        })
        user.save(err => {
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

router.post('/login', (req, res) => {
  if (!req.body ||
      !req.body.user ||
      !req.body.pass) {
    res.status(400).json({ msg: 'Authorization Required' })
  } else {
    Users.findOne({
      name: req.body.user,
      pass: req.body.pass
    }, (err, docs) => {
      if (err || !docs) {
        res.status(401).json({ msg: 'Authentication Faild' })
      } else {
        req.session.user = req.body.user
        res.json({ ok: true, user: req.session.user })
      }
    })
  }
})

router.post('/logout', (req, res) => {
  if (req.session && req.session.user) {
    req.session.user = null
  }
  res.json({ ok: true })
})

module.exports = router
