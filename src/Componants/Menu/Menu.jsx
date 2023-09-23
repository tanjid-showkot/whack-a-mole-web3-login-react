import React, { useState } from 'react';
import './menu.css'
import Game from '../Game/Game';


const Menu = (props) => {
    // eslint-disable-next-line react/prop-types
    const connection = props.wallet;
    const [game, setGame] = useState(false);
    const nevigatetogame = () => {
        setGame(true);
    }




    return (
        <div className={
            game ? 'cursorOff' : 'cursorOn'
        }>
            <div>
                <h1
                    // eslint-disable-next-line react/prop-types
                    className='walAdd'>{connection.account.address}</h1>
            </div>
            {
                game ?
                    (
                        <Game></Game>
                    ) : (
                        <div className="button-div">
                            <button onClick={nevigatetogame} className="button">Start</button>
                            <br />
                            <button


                                className="button">Leader Board</button>
                            <br />
                            <button className="button">About Us</button>
                        </div>

                    )
            }


        </div>
    );
};

export default Menu;