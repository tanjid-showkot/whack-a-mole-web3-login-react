import React, { useEffect, useState } from 'react';
import './login.css'
import {
    connect,
} from "@argent/get-starknet";
import Menu from '../Menu/Menu';
import Logo from '../Logo/Logo';


const LogIn = () => {
    const [connection, setConnection] = useState();
    const [user, setuser] = useState([]);
    const WW_URL = "https://web.argent.xyz";
    useEffect(() => {
        fetch('http://localhost:5000/userdata')
            .then(res => res.json())
            .then(data => {
                setuser(data)
                console.log(data)
            }
            );

    }, [])
    useEffect(() => {
        const connectToStarknet = async () => {
            try {
                const connection = await connect({
                    modalMode: "neverAsk",
                    webWalletUrl: WW_URL,
                }); // try to reconnect to a previously used wallet

                if (connection && connection.isConnected) {
                    setConnection(connection);
                    user.forEach(element => {
                        if (element.userid === connection.account.address) {
                            console.log('user already exist')
                        }
                        else {
                            const user1 = { userid: connection.account.address, score: 0 };
                            localStorage.setItem('userid', JSON.stringify(user1.userid));

                            fetch('http://localhost:5000/userdata', {
                                method: 'POST',
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify(user1)

                            }).then(res => res.json())
                                .then(data => {
                                    console.log(data)
                                });
                        }

                    });

                }
            }
            catch (error) {
                // Handle the error, e.g., by retrying the request
                console.error("Error connecting to Starknet:", error);
            }
        };
        connectToStarknet();
    }, []);




    return (
        <div>
            <Logo></Logo>


            {
                connection && connection.isConnected ?
                    <Menu
                        wallet={connection}
                    ></Menu> :

                    <button
                        onClick={async () => {
                            const connection = await connect({
                                webWalletUrl: WW_URL,
                            });

                            if (connection && connection.isConnected) {
                                setConnection(connection);
                                user.forEach(element => {
                                    if (element.userid === connection.account.address) {
                                        console.log('user already exist')
                                    }
                                    else {
                                        const user1 = { userid: connection.account.address, score: 0 };
                                        localStorage.setItem('userid', JSON.stringify(user1.userid));


                                        fetch('http://localhost:5000/userdata', {
                                            method: 'POST',
                                            headers: {
                                                'content-type': 'application/json'
                                            },
                                            body: JSON.stringify(user1)

                                        }).then(res => res.json())
                                            .then(data => {
                                                console.log(data)
                                            });
                                    }

                                });





                            }
                        }}
                        className='loginBtn'

                    >{connection ? connection.account.address : "connect wallet"}</button>

            }




        </div>
    );
};

export default LogIn;