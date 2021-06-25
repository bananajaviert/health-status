import express from 'express'
import Health from '../models/health.model.js'

const router = express.Router()

router.route('/').get((req, res) => {
    Health.find()
        .then(health => res.json(health))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/add').post((req, res) => {
    const add_new = {
        fullname: req.body.fullname,
        temperature: req.body.temperature,
        email: req.body.email,
        phone_number: req.body.phone_number
    }

    const new_health_declaration = new Health({...add_new})

    new_health_declaration.save()
        .then(health => res.json('New Record Added'))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

// find  document by ID
router.route('/:id').get((req, res) => {
    Health.findById(req.params.id)
        .then(health => res.json(health))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

// delete document
router.route('/:id').delete((req, res) => {
    Health.findByIdAndDelete(req.params.id)
        .then(health => res.json(`Record deleted`))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/update/:id').put((req, res) => {
    const update_data = req.body
    
    Health.findById(req.params.id)
        .then(health => {

            health.fullname = update_data.fullname ? update_data.fullname : health.fullname
            health.temperature = update_data.temperature ? update_data.temperature : health.temperature
            health.email = update_data.email ? update_data.email : health.email
            health.phone_number = update_data.phone_number ? update_data.phone_number : health.phone_number
                    
            health.save()
                .then(() => res.json('Record updated'))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
})

export default router
