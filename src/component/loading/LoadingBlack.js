import React from 'react';
import ReactLoading from 'react-loading';
import './LoadingBlack.css'
 
const LoadingBlack = ({ type, color }) => (

    <div>

        <header className="ex-loading">
           <ReactLoading type={type} color={color} height={90} width={100} />
        </header>
       
    </div>

    
   
);
 
export default LoadingBlack;
