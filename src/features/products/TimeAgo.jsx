import { parseISO, formatDistanceToNow, parse } from "date-fns";

import React from "react";

const TimeAgo = ({ timeStamp }) => {
  let timeAgo = timeStamp;
  if (timeStamp) {
    const date = parseISO(timeStamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <small>
      <span title={timeStamp}>
        &nbsp; <i>{timeAgo}</i>
      </span>
    </small>
  );
};

export default TimeAgo;
