import React, { useEffect, useState } from 'react';
import './login.css'
import {
    connect,
} from "@argent/get-starknet";
import Menu from '../Menu/Menu';


const LogIn = () => {
    const [connection, setConnection] = useState();
    const WW_URL = "https://web.argent.xyz";
    useEffect(() => {
        const connectToStarknet = async () => {
            try {
                const connection = await connect({
                    modalMode: "neverAsk",
                    webWalletUrl: WW_URL,
                }); // try to reconnect to a previously used wallet

                if (connection && connection.isConnected) {
                    setConnection(connection);
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
            {
                connection && connection.isConnected ?
                    <Menu
                        connection={connection}
                    ></Menu> :
                    <button
                        onClick={async () => {
                            const connection = await connect({
                                webWalletUrl: WW_URL,
                            });

                            if (connection && connection.isConnected) {
                                setConnection(connection);
                            }
                        }}
                        className='loginBtn'

                    >{connection ? connection.account.address : "connect wallet"}</button>

            }




        </div>
    );
};

export default LogIn;