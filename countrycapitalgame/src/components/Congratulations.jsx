import gameCompletedIcon from "../assets/gameCompleted.png"
export default function Congratulations()
{
    return (
        <div id="gameCompleted">
            <img src={gameCompletedIcon} alt="Trophy Icon"/>
            <h2>Game Completed!</h2>
        </div>
    );
}