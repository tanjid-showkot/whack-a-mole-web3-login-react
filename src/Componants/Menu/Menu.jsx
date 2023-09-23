import React, { useState } from 'react';
import './menu.css'
import Game from '../Game/Game';
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import AboutUs from '../AboutUs/AboutUs';


const Menu = (props) => {
    // eslint-disable-next-line react/prop-types
    const connection = props.wallet;
    const [game, setGame] = useState(false);
    const [leaderboard, setLeaderboard] = useState(false);
    const [aboutUs, setAboutus] = useState(false);
    const nevigatetogame = () => {
        setGame(true);
    }
    const nevigatetoleaderboard = () => {
        setLeaderboard(true);
    }
    const nevigatetoaboutus = () => {
        setAboutus(true);
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
                game ? <Game></Game> : leaderboard ? <LeaderBoard></LeaderBoard> : aboutUs ? <AboutUs></AboutUs> :
                    (
                        (<div className="button-div">
                            <button onClick={nevigatetogame} className="button">Start</button>
                            <br />
                            <button onClick={nevigatetoleaderboard}
                                className="button">Leader Board</button>
                            <br />
                            <button onClick={nevigatetoaboutus} className="button">About Us</button>
                        </div>)

                    )
            }



        </div>
    );
};

export default Menu;