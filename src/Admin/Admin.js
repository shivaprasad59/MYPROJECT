import React from 'react'
import { Link } from 'react-router-dom'
const Admin = () => {
  return (
    <div>
        <Link to="/Admin/UsersList" className='userslist'>UsersList</Link>
        <Link to="/Admin/AddRestaurants" className='add-restaurants'>Add Restaurants</Link>
    </div>
  )
}

export default Admin;