import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import './UsersList.css'
const UsersList = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/Users");
                setData(response.data);
            }
            catch (e) {
                console.log(e);
            }

        }
        fetchData();
    }, [])
    return (
        <div className='body4'>
            <h1>Users Details::</h1>
            <table>
                <tr>
                    <th className='th1'>Sno.</th>
                    <th className='th2'>Name of the Customer</th>
                    <th className='th3'>Mobile No</th>
                    <th className='th4'>Address:</th>
                    <th className='th4'>Password:</th>
                </tr>
            </table>
            {
                data.map((item, index) => {
                    return (
                        <div key={item.id}>
                            <table>
                                <tr>
                                    <td className='th1'>{item.id}</td>
                                    <td className='th2'>{item.username}</td>
                                    <td className='th3'>{item.mobile}</td>
                                    <td className='th4'>{item.address}</td>
                                    <td className='th5'>{item.password}</td>
                                </tr>
                            </table>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UsersList