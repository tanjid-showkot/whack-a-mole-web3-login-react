import { useEffect, useState } from 'react';
import mole from '../../assets/mole.png'
import moleWhaked from '../../assets/mole-whacked.png'
import sound from '../../assets/smash.mp3'
import useSound from 'use-sound';
import './style.css'

const Game = (props) => {
    const connection = props.wallet;
    const [play] = useSound(sound);

    let timeLeft = 30;
    const [imag, setImag] = useState(mole)
    const [user, setuser] = useState([]);
    const [userid, setuserid] = useState([]);
    const [timer, setTimer] = useState(timeLeft);
    const [Score, setScore] = useState(0);
    const [signature, setSignature] = useState();

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
    useEffect(() => {
        fetch('https://whack-a-mole-server-1geqswuwu-tanjid-hossens-projects.vercel.app/multi')
            .then(res => res.json())
            .then(data => {
                setuser(data)
            }
            );

    }, [Score])
    useEffect(() => {
        fetch('https://whack-a-mole-server-1geqswuwu-tanjid-hossens-projects.vercel.app/userdata')
            .then(res => res.json())
            .then(data => {
                setuserid(data)
                console.log(userid)
            });

    }, [])
    const signMassage = async () => {
        const sig = await connection.account.signMessage({
            domain: {
                name: "Whack a mole",
                chainId: connection.chainId,
                version: "0.0.1",
            },
            types: {
                StarkNetDomain: [
                    { name: "name", type: "felt" },
                    { name: "chainId", type: "felt" },
                    { name: "version", type: "felt" },
                ],
                Message: [{ name: "message", type: "felt" }],
            },
            primaryType: "Message",
            message: {
                message: Score,
            },
        });

        setSignature(sig);
        console.log(sig);

    }


    const intervals = () => {
        const interval = setInterval(() => {
            setTimer(timeLeft--);
            if (timeLeft === 0) {
                clearInterval(interval);
                setTimer('Time Out');
                document.querySelector('.board').style.display = 'none';
                document.querySelector('.box').style.display = 'none';
                document.querySelector('.user').style.display = 'none';
                document.querySelector("body").style.cursor = "default";
                document.querySelector('.finalScore').style.display = 'block';
                document.querySelector('.restartBtn').style.display = 'block';
                document.querySelector('.cursor').style.display = 'none';
                const userid = JSON.parse(localStorage.getItem('userid'))
                const findUser = user.find(element => element.userid === userid)
                fetch(`https://whack-a-mole-server-1geqswuwu-tanjid-hossens-projects.vercel.app/multi/${findUser._id}`, {
                    method: 'DELETE'
                }).then(res => res.json())
                    .then(data => {
                        console.log(data)
                    });

                if (findUser.score < Score) {
                    signMassage();
                    fetch(`https://whack-a-mole-server-1geqswuwu-tanjid-hossens-projects.vercel.app/userdata/${findUser._id}`, {
                        method: 'PATCH',
                        headers: {
                            'content-type': 'application/json',
                            "Access-Control-Allow-Origin": "*",
                        },
                        body: JSON.stringify({ score: Score })
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                        });
                }


            }
        }, 1000);


    }





    const handleRestart = () => {
        window.location.reload();

    }

    const userscore = () => {
        setScore(Score + 10); 0
        const userid = JSON.parse(localStorage.getItem('userid'))
        const findUser = user.find(element => element.userid === userid)
        fetch(`https://whack-a-mole-server-1geqswuwu-tanjid-hossens-projects.vercel.app/multi/${findUser._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ score: Score })
        })
            .then(res => res.json())
            .then(data => {
            });

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
        play();
        userscore();
        setTimeout(() => {
            setImag(mole)
            newHoles[index].status = false;
            setHoles(newHoles);
        }, 500);
    };
    useEffect(() => {
        intervals();
        const interval = setInterval(() => {
            activeMole();

        }, 1500);
        return () => clearInterval(interval);
    }, []);




    document.querySelector('.logo').style.display = 'none';

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
                <h3 className="score">Score : <span>{Score}</span></h3>
                <h3 className="countdown">
                    Time Left : <span> {timer} </span> <span> sec </span>
                </h3>
            </div>
            <div className='user'>
                {
                    user.map((users) => (
                        <h1> <span className='userwal' >{users.userid}</span> <span className='scores'> {users.score} </span> </h1>


                    ))

                }


            </div>
            <div className="finalScore">
                {
                    user.map((users) => (
                        <h1> <span className='userwal' >{users.userid}</span> <span className='scores'> {users.score} </span> </h1>


                    ))

                }

            </div>
            <button onClick={handleRestart} className="restartBtn">Restart</button>


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