import '../App.css';
import { useState } from 'react';






export const ExplorePage = () => {

const [country,setCountry] = useState('0');
console.log(country);
 const handleChange =(event:any)=>{
    setCountry(event.target.value);
    }




    return (
        <div className="form-container">
            <input type="text" className="text-box"
            value = {country}  onChange={handleChange}  placeholder="Enter text" />
            <button className="submit-button"  >Submit</button>
        </div>
    );
};


