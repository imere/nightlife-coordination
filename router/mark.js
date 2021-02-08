import express from 'express'
import Users from '../data/data'
import { withAuth } from '../middleware/auth'

const router = express.Router()

router.post('/add', withAuth(), (req, res) => {
  const mark = JSON.parse(req.body.mark)

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
})

router.post('/del', withAuth(), (req, res) => {
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
})

router.post('/get', withAuth(), (req, res) => {
  Users.findOne({
    name: req.session.user
  }, {
    _id: 0,
    name: 0,
    pass: 0
  }, (err, doc) => {
    if (err) {
      res.status(500).json({ ok: false })
    } else if (!doc) {
      res.status(401).json({ ok: false })
    } else {
      res.json({ marks: doc.marks })
    }
  })
})

export default router
