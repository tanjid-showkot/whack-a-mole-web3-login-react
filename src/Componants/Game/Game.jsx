import React, { useEffect, useState } from 'react';
import mole from '../../assets/mole.png'
import moleWhaked from '../../assets/mole-whacked.png'
import './style.css'

const Game = () => {
    let timeLeft = 30;
    const [imag, setImag] = useState(mole)
    const [timer, setTimer] = useState(timeLeft);
    const [score, setScore] = useState(0);
    const [holes, setHoles] = useState([
        { id: 0, status: false },
        { id: 1, status: false },
        { id: 2, status: false },
        { id: 3, status: false },
        { id: 4, status: false },
        { id: 5, status: false },
        { id: 6, status: false },
        { id: 7, status: false },
        { id: 8, status: false }
    ]);


    function intervals() {
        const interval = setInterval(() => {
            setTimer(timeLeft--);
            if (timeLeft === 0) {
                clearInterval(interval);
                alert(`Game Over! Your Score is ${score}`);
            }
        }, 1000);


    }

    const activeMole = () => {
        const newHoles = [...holes];
        const random = Math.floor(Math.random() * 9);
        newHoles[random].status = true;
        setHoles(newHoles);
        setTimeout(() => {
            newHoles[random].status = false;
            setHoles(newHoles);
        }, 1500);
    };
    const whack = (index) => {
        const newHoles = [...holes];
        setImag(moleWhaked)
        setScore(score + 1);
        setTimeout(() => {
            newHoles[index].status = false;
            setHoles(newHoles);
            setImag(mole)
        }, 500);




    };
    useEffect(() => {
        intervals();
        const interval = setInterval(() => {
            activeMole();

        }, 1500);
        return () => clearInterval(interval);
    }, []);






    window.addEventListener('mousemove', (e) => {
        let cursor = document.querySelector('.cursor')
        cursor.style.left = e.pageX + 'px'
        cursor.style.top = e.pageY + 'px'
    });
    window.addEventListener('mousedown', () => {
        let cursor = document.querySelector('.cursor')
        cursor.classList.add('active')
    });
    window.addEventListener('mouseup', () => {
        let cursor = document.querySelector('.cursor')
        cursor.classList.remove('active')
    });










    return (
        <div>
            <div className="box">
                <h3 className="score">Score : <span>{score}</span></h3>
                <h3 className="countdown">
                    Time Left : <span> {timer} </span> <span> sec </span>
                </h3>
            </div>

            <div className="board">
                {
                    holes.map((hole) => (
                        <div key={hole.id} className='hole' >
                            <img src={imag} onClick={() => whack(hole.id)} className={hole.status ? 'mole' : 'molehidden'} alt="" />
                        </div>
                    ))

                }


            </div>
            <div className="cursor"></div>

        </div>
    );
};

export default Game;