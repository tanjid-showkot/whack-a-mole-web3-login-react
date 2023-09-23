import { useState } from 'react';
import './style.css'
import { useEffect } from 'react';
import Team from './Team';

const AboutUs = () => {

    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetch('../../../src/assets/team.json')
            .then(res => res.json())
            .then(data => setMembers(data))
    }, [])
    console.log(members);
    return (
        <div>
            <div><a onClick={() => {
                window.location.reload();
            }}><span className="arrow left"></span></a></div>



            <div className='cards'>{
                members.map(member => <Team
                    key={member.id}
                    member={member}
                ></Team>

                )

            }

            </div>




        </div>


    );
};

export default AboutUs;