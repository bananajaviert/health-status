import { Link } from 'react-router-dom'

const Health = ({ item, delete_item }) => {
    return (
        <tr>
            <td>{item.fullname}</td>
            <td>{item.temperature}</td>
            <td>{item.email}</td>
            <td>{item.phone_number}</td>
            <td className='text-center'>
                <Link to={`/edit/${item._id}`} className='btn btn-secondary' style={button_style}>Edit</Link>
                <button onClick={() => delete_item(item._id)} className='btn btn-danger' style={button_style}>Delete</button>
            </td>
        </tr>
    )
}

const button_style = {
    width: '5rem',
    margin: '.5rem'
}

export default Health
