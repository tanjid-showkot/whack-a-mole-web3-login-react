import React, { useEffect, useState } from 'react';
import './style.scss'
import Game from '../Game/Game';

const Loading = (props) => {
    const connection = props.wallet;
    const users = props.user;

    const [user, setuser] = useState([]);
    useEffect(() => {
        fetch('https://whack-a-mole-server-1geqswuwu-tanjid-hossens-projects.vercel.app/multi')
            .then(res => res.json())
            .then(data => {
                setuser(data)
            }
            );
    }, [user])

    document.querySelector('.logo').style.display = 'none';
    return (
        <div>
            {
                user.length > 1 ? <Game
                    wallet={connection}
                    user={users}
                    multi={user}
                ></Game> : (
                    (<div className="loading-container">
                        <div className="loading-text">
                            <span>W</span>
                            <span>A</span>
                            <span>I</span>
                            <span>T</span>
                            <span>I</span>
                            <span>N</span>
                            <span>G</span>
                            <span>  </span>

                            <span>F</span>
                            <span>O</span>
                            <span>R</span>
                            <span> </span>

                            <span>J</span>
                            <span>O</span>
                            <span>I</span>
                            <span>N</span>
                            <span>I</span>
                            <span>N</span>
                            <span>G</span>
                            <span> </span>

                            <span>P</span>
                            <span>L</span>
                            <span>A</span>
                            <span>Y</span>
                            <span>E</span>
                            <span>R</span>
                        </div>
                    </div>)
                )
            }



        </div>


    );
};

export default Loading;