import { createSignal, onCleanup } from "solid-js";
import { RiMapTruckFill } from 'solid-icons/ri'
// import "./ticker.scss";

const timeBetweenDates = (validTill) => {
  const validFromDate = new Date();
  const minutesTimer = 3;
  const validTillTimeStamp = Number(validTill);
  const validTillDate = new Date(validTillTimeStamp + minutesTimer * 60 * 1000);
  const difference = validTillDate.getTime() - validFromDate.getTime();

  let timeData = {
    hours: "00",
    minutes: "00",
    seconds: "00",
  };
  if (difference > 0) {
    let seconds = Math.floor(difference / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;

    timeData = {
      hours: hours < 10 ? `0${hours}` : `${hours}`,
      minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
      seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
    };
  }
  return {
    timeData,
    difference,
  };
};

const CountdownTimer = ({ validTill }) => {
  const [timerDetails, setTimerDetails] = createSignal(
    timeBetweenDates(validTill).timeData
  );
  const timer = setInterval(() => {
    validTill && setTimerDetails(timeBetweenDates(validTill).timeData);
    if (
      timerDetails().hours === "00" &&
      timerDetails().minutes === "00" &&
      timerDetails().seconds === "00"
    ) {
      validTill && clearInterval(timer);
      validTill && localStorage.removeItem("targetTime");
    }
  }, 1000);

  onCleanup(() => clearInterval(timer));

  return (
    <li><RiMapTruckFill size={24} color="#000000" />
      Order in next{" "}
      <strong>
        <span className="ticker-unit-container">
          <span className="ticker-unit">{timerDetails().hours}</span>
        </span>
        :
        <span className="ticker-unit-container">
          <span className="ticker-unit">{timerDetails().minutes}</span>
        </span>
        :
        <span className="ticker-unit-container">
          <span className="ticker-unit">{timerDetails().seconds}</span>
        </span>
      </strong>{" "}
      for delivery <strong>3rd March</strong>
    </li>
  );
};

export default CountdownTimer;
