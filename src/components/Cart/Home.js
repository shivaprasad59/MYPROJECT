import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [data, setData] = useState([]);
  const [cartdata, setCartData] = useState([]);
  const [rdata, setRdata] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/Hyderabaspicedata");
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/cart");
        setCartData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    if (data.length !== 0 && cartdata.length !== 0 && rdata.length === 0) {
      const matchedData = [];
      for (let i = 0; i < cartdata.length; i++) {
        const item = cartdata[i];
        const match = data.find(d => d.Id === item.id);
        if (match) {
          matchedData.push(match);
        }
      }
      setRdata(matchedData);
    }
  }, [data, cartdata, rdata]);

  return (
    <div>
      {rdata.map(item => (
        <div key={item.Id}>
          <img src={item.Image}/>
          <h5>Item-Name:{item.Item_name}</h5>
          <h6>Price:{item.Price}</h6>
          </div>
      ))}
    </div>
  );
};

export default Home;
