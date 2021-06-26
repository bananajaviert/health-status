import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const Edit = () => {
    const { id } = useParams()
    const [item_to_update, set_item_to_update] = useState([])

    const [fullname, set_fullname] = useState('')
    const [temperature, set_temperature] = useState('')
    const [email, set_email] = useState('')
    const [phone_number, set_phone_number] = useState('')

    useEffect(() => {
        const get_item = async () => {
            const res = await axios.get(`http://localhost:8080/health/${id}`)
            const data = await res.data
            set_item_to_update(data)
        }

        get_item()
    }, [])

    const update_item = async health => {
        try {
            const res = await axios.put(`http://localhost:8080/health/update/${id}`, health)
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

    const submit_form = e => {
        e.preventDefault()

        const new_data = {
            fullname: fullname,
            temperature: temperature,
            email: email,
            phone_number: phone_number
        }

        update_item({...new_data})
    }
    

    return (
        <div className='container' style={{margin: '5rem'}}>
            
            <form action="" onSubmit={submit_form}>
                <div className="form-group">
                    <label htmlFor="">Full name</label>
                    <input 
                    value={fullname} 
                    onChange={e => set_fullname(e.target.value)} 
                    type="text" className='form-control'
                    placeholder={item_to_update.fullname}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Temperature (C&deg;)</label>
                    <input 
                    value={temperature} 
                    onChange={e => set_temperature(e.target.value)} 
                    type="number" className='form-control'
                    step='0.1'
                    placeholder={item_to_update.temperature}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input 
                    value={email} 
                    onChange={e => set_email(e.target.value)} 
                    type="email" className='form-control'
                    placeholder={item_to_update.email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Phone Number (09 or +63)</label>
                    <input 
                    value={phone_number} 
                    onChange={e => set_phone_number(e.target.value)} 
                    type="tel" className='form-control'
                    placeholder={item_to_update.phone_number}/>
                </div>

                <button type="submit" className='btn btn-primary'>Submit</button>
            </form>

        </div>
    )
}

export default Edit
