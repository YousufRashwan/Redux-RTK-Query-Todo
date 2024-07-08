import { useSelector, useDispatch } from "react-redux";
import { moveAdded, isTie, isWin, reset } from "./boardSlice";
import { selectCurrentMove } from "./boardSlice";
const BoardNode = ({ nodeValue, nodeId }) => {
  const dispatch = useDispatch();

  const currentMove = useSelector(selectCurrentMove);

  const handleNodeClick = (e) => {
    const nodeContent = e.target.textContent;
    if (nodeContent === "-") {
      dispatch(moveAdded({ nodeId, currentMove }));
      dispatch(isTie());
      dispatch(isWin());
      dispatch(reset());
    }
  };

  return (
    <div className="node" onClick={handleNodeClick}>
      {nodeValue}
    </div>
  );
};

export default BoardNode;
