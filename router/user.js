import express from 'express'
import { validatePassword, validateUsername } from '../config/validator'
import Users from '../data/data'
import { withAuth } from '../middleware/auth'

const router = express.Router()

router.post('/register', (req, res) => {
  if (!req.body ||
      !req.body.user ||
      !req.body.pass) {
    return res.status(400).json({ ok: false })
  } else if (!validateUsername(req.body.user) ||
             !validatePassword(req.body.pass)) {
    return res.status(400).json({ msg: 'Bad Format' })
  }

  Users.findOne({
    name: req.body.user
  }, (err, docs) => {
    if (err) {
      return res.status(500).json({ ok: false })
    } else if (docs) {
      return res.status(400).json({ msg: 'user exists' })
    }

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
  })
})

router.post('/login', (req, res) => {
  if (!req.body.user || !req.body.pass) {
    return res.status(400).json({ msg: 'Bad Request' })
  }

  Users.findOne({
    name: req.body.user,
    pass: req.body.pass
  }, (err, docs) => {
    if (err || !docs) {
      res.status(400).json({ msg: 'Authentication Faild' })
    } else {
      req.session.user = req.body.user
      res.json({ ok: true, user: req.session.user })
    }
  })
})

router.post('/logout', withAuth(), (req, res) => {
  req.session.user = null
  res.json({ ok: true })
})

export default router
