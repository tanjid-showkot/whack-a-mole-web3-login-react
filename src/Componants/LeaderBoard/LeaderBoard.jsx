import React from 'react';
import './style.css'

const LeaderBoard = () => {
    return (
        <div>
            <h1>this is leaderboard</h1>
            <a onClick={() => {
                window.location.reload();
            }}><span className="arrow left"></span></a>

        </div>
    );
};

export default LeaderBoard;