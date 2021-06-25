import Swal from 'sweetalert2'

const Create = ({ add_new, fullname, set_fullname, temperature, set_temperature, email, set_email, phone_number, set_phone_number }) => {

    const submit_form = e => {
        e.preventDefault()
        
        if(!fullname ||
            !temperature ||
            !email ||
            !phone_number) {
                return Swal.fire({
                    icon: 'warning',
                    text: 'Please fill out the form'
                }) 
        }

        add_new({ fullname, temperature, email, phone_number })

        set_fullname('')
        set_temperature('')
        set_email('')
        set_phone_number('')
    }

    return (
        <div className='container' style={{margin: '5rem'}}>
            <h1>Add New</h1>

            <form action="" onSubmit={submit_form}>
                <div className="form-group">
                    {/* <label htmlFor="">Full name</label> */}
                    <input 
                    value={fullname} 
                    onChange={e => set_fullname(e.target.value)} 
                    type="text" className='form-control'
                    placeholder='Full Name'/>
                </div>
                <div className="form-group">
                    {/* <label htmlFor="">Temperature (C&deg;)</label> */}
                    <input 
                    value={temperature} 
                    onChange={e => set_temperature(e.target.value)} 
                    type="number" className='form-control'
                    step='0.1'
                    placeholder='Temperature in (C&deg;)'/>
                </div>
                <div className="form-group">
                    {/* <label htmlFor="">Email</label> */}
                    <input 
                    value={email} 
                    onChange={e => set_email(e.target.value)} 
                    type="email" className='form-control'
                    placeholder='Email Address'/>
                </div>
                <div className="form-group">
                    {/* <label htmlFor="">Phone Number (09 or +63)</label> */}
                    <input 
                    value={phone_number} 
                    onChange={e => set_phone_number(e.target.value)} 
                    type="tel" className='form-control'
                    placeholder='Phone Number (09 or +63)'/>
                </div>

                <button type="submit" className='btn btn-primary'>Add</button>
            </form>

        </div>
    )
}

export default Create
