import React from 'react'
import data from '../Restaurants/Restaurantsdata'
const Home = () => {
    return (
        <div>

            <div>
                {data.map((item) => {
                    return (
                        <div className='restaurants-data' key={item.id}>
                            <div className="card" style={{ width: "18rem" }} >
                                <img src={item.image} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <h5 className="rating">{item.rating}</h5>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default Home