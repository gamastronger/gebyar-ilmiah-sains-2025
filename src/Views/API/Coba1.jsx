import React from 'react'
import { useState, useEffect } from 'react'

function Coba1() {
    const [data, setData] = useState([])
    useEffect(() => {
        getData()
    }, [])
    
    const getData=()=> {
        fetch('https://gis-backend.karyavisual.com/api/users', {})
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>email</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Coba1