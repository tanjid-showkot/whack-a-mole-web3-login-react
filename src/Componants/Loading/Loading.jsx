import React, { useEffect, useState } from 'react';
import './style.scss'
import Game from '../Game/Game';

const Loading = () => {

    const [user, setuser] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/multi')
            .then(res => res.json())
            .then(data => {
                setuser(data)
                console.log(data)
            }
            );
    }, [user])
    document.querySelector('.logo').style.display = 'none';
    return (
        <div>
            {
                user.length > 0 ? <Game></Game> : (
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