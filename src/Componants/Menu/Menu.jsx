import { useState } from 'react';
import './menu.css'
import Game from '../Game/Game';
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import AboutUs from '../AboutUs/AboutUs';
import Loading from '../Loading/Loading';


const Menu = (props) => {
    // eslint-disable-next-line react/prop-types
    const connection = props.wallet;
    const user = props.user;
    const [game, setGame] = useState(false);
    const [leaderboard, setLeaderboard] = useState(false);
    const [aboutUs, setAboutus] = useState(false);
    const nevigatetogame = () => {
        const user = { userid: connection.account.address, score: 0 };


        fetch('https://whack-a-mole-server.vercel.app/multi', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)

        }).then(res => res.json())
            .then(data => {
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
                game ? <Loading
                    wallet={connection}
                ></Loading> : leaderboard ? <LeaderBoard
                    wallet={connection}
                    user={user}
                ></LeaderBoard> : aboutUs ? <AboutUs></AboutUs> :
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