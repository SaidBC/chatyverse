import { useEffect, useState } from "react";
import timesAgo from "../utils/timesAgo";

function FormattedTimeAgo({ date, ...props }) {
  const [time, setTime] = useState(timesAgo(date));
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(timesAgo(date));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <span {...props}>{time}</span>;
}
export default FormattedTimeAgo;
