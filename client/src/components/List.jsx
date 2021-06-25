import Health from "./Health"

const List = ({ health, edit_item, delete_item }) => {

    return (
        <div className='container' style={{margin: '5rem'}}>
            <h1>Record</h1>
            <table className='table table-bordered table-hover'>
                <thead className='thead-dark'>
                    <tr>
                        <th>Full Name</th>
                        <th>Temperature</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th className='text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        health.map(item => {
                            return <Health key={item._id} item={item} edit_item={edit_item} delete_item={delete_item}/>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default List
