import { useSelector } from "react-redux";
import { selectLayout, selectPlayers } from "./boardSlice";
import BoardNode from "./BoardNode";

const Layout = () => {
  const layout = useSelector(selectLayout);
  const players = useSelector(selectPlayers);

  const { player1, player2 } = players;

  const renderdBoard = layout.map((nodeValue, nodeIndex) => (
    <BoardNode key={nodeIndex} nodeValue={nodeValue} nodeId={nodeIndex} />
  ));

  return (
    <div>
      <div className="board-grid">{renderdBoard}</div>
      <div className="score-container">
        <p>Player1: {player1.score}</p>
        <p>Player2: {player2.score}</p>
      </div>
    </div>
  );
};

export default Layout;
