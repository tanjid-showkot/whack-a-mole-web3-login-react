import React from 'react';
import './menu.css'

const Menu = (props) => {
    const connection = props.connection;
    return (
        <div>
            <div>
                <h1 className='walAdd'>{connection.account.address}</h1>
            </div>
            <div className="button-div">
                <button className="button">Start</button>
                <br />
                <button className="button">Leader Board</button>
                <br />
                <button className="button">About Us</button>
            </div>

        </div>
    );
};

export default Menu;