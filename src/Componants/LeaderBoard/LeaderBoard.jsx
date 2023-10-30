// Removed unused import statement
import './style.css'

const LeaderBoard = (props) => {
    const connection = props.wallet;
    const user = props.user;
    document.querySelector('.logo').style.display = 'none';
    console.log(user)
    return (
        <div>
            <h1 className='leaderboardTitle'>LeaderBoard</h1>
            <a onClick={() => {
                window.location.reload();
            }}><span className="arrow left"></span></a>
            <div className="leaderboard">
                {
                    user.map((users) => (
                        <h1> <span className='userwall' >{users.userid}</span> <span className='scores'> {users.score} </span> </h1>))
                }

            </div>

        </div>
    );
};

export default LeaderBoard;