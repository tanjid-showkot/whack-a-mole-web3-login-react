import { useState } from 'react';
import './menu.css'
import Game from '../Game/Game';
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import AboutUs from '../AboutUs/AboutUs';
import Loading from '../Loading/Loading';


const Menu = (props) => {
    // eslint-disable-next-line react/prop-types
    const connection = props.wallet;
    const [game, setGame] = useState(false);
    const [leaderboard, setLeaderboard] = useState(false);
    const [aboutUs, setAboutus] = useState(false);
    const nevigatetogame = () => {
        const user = { userid: connection.account.address, score: 0 };


        fetch('http://localhost:5000/multi', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)

        }).then(res => res.json())
            .then(data => {
                console.log(data)
            });


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
                game ? <Loading></Loading> : leaderboard ? <LeaderBoard></LeaderBoard> : aboutUs ? <AboutUs></AboutUs> :
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