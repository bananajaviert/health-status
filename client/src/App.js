import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import './App.css'
// Components
import Header from './components/Header'
import List from './components/List'
import Edit from './components/Edit'
import Create from './components/Create'

function App() {
  const [health, set_health] = useState([])
  
  const [fullname, set_fullname] = useState('')
  const [temperature, set_temperature] = useState('')
  const [email, set_email] = useState('')
  const [phone_number, set_phone_number] = useState('')

  useEffect(() => {
    get_all()
  }, [])

  const get_all = async () => {
    try {
      const res = await axios.get('http://localhost:8080/health')
      const data = await set_health(res.data)
    }
    catch(error) {
      Swal.fire({
        icon: 'error',
        text: error
      })
    }
  }

  const get_one = async props => {
    try {
      const res = await axios.get(`http://localhost:8080/health${props.match.params.id}`)
      const data = await set_health(res.data)
    }
    catch(error) {
      Swal.fire({
        icon: 'error',
        text: error
      })
    }
  }

  const edit_item = async props => {
    try {
      const res = await axios.post(`http://localhost:8080/health/update/${props.match.params.id}`)
      const data = await res.data

      Swal.fire({
        icon: 'success',
        text: `${data}`,
        showCancelButton: true,
        confirmButtonColor: 'steelblue',
        confirmButtonText: 'View list',
        cancelButtonText: 'Add another',
        cancelButtonColor: 'green'
      }).then(result => {
        if(result.isConfirmed) {
          return window.location = '/'
        }
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          text: err
        })
      })
    }
    catch(error) {
      Swal.fire({
        icon: 'error',
        text: error
      })
    }
  }


  const add_new = async health => {
    try {
      const res = await axios.post('http://localhost:8080/health/add', health)
      const data = await res.data

      Swal.fire({
        icon: 'success',
        text: `${data}`,
        showCancelButton: true,
        confirmButtonColor: 'steelblue',
        confirmButtonText: 'View list',
        cancelButtonText: 'Add another',
        cancelButtonColor: 'green'
      }).then(result => {
        if(result.isConfirmed) {
          return window.location = '/'
        }
      })
    }
    catch(error) {
      Swal.fire({
        icon: 'error',
        text: error
      })
    }
  }

  const delete_item = async id => {
    try {
      const res = await axios.delete(`http://localhost:8080/health/${id}`)
      const data = await res.data

      set_health(health.filter(item => {
        return item._id !== id
      }))

     Swal.fire({
       icon: 'success',
       text: data
     })
     
    }
    catch(error) {
      Swal.fire({
        icon: 'error',
        text: error
      })
    }
  }
  
  return (
    <Router>
      <Header/>
      <br />
      <Route exact path='/' render={props => (
        <List {...props} health={health} edit_item={edit_item} delete_item={delete_item}/>
      )}/>
      <Route path='/edit/:id' render={props => (
        <Edit {...props} edit_item={edit_item}
        fullname={fullname} set_fullname={set_fullname}
          temperature={temperature} set_temperature={set_temperature}
          email={email} set_email={set_email}
          phone_number={phone_number} set_phone_number={set_phone_number}/>
        )}
      />
      <Route path='/create' render={props => (
          <Create {...props} add_new={add_new}
          fullname={fullname} set_fullname={set_fullname}
          temperature={temperature} set_temperature={set_temperature}
          email={email} set_email={set_email}
          phone_number={phone_number} set_phone_number={set_phone_number}/>
        )}
      />
    </Router>
  )
}

export default App
