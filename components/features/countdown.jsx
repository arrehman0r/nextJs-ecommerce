import { useEffect, useState } from "react";
import Countdown, { zeroPad } from "react-countdown";

export default function ProductCountDown(props) {
  const { type = 1, adClass = "" } = props;
  const [date, setDate] = useState(getInitialDate());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      // Check if current time is past midnight (12:00 AM)
      if (
        now.getHours() === 0 &&
        now.getMinutes() === 0 &&
        now.getSeconds() === 0
      ) {
        // Reset the countdown to the next day
        setDate(getInitialDate());
      }
    }, 1000); // Check every second for midnight
    return () => clearInterval(interval);
  }, []);

  function getInitialDate() {
    const now = new Date();
    // If current time is past midnight, set initial date to midnight of the next day
    if (
      now.getHours() === 0 &&
      now.getMinutes() === 0 &&
      now.getSeconds() === 0
    ) {
      return new Date(now.getTime() + 24 * 60 * 60 * 1000); // Adding 24 hours
    } else {
      // Otherwise, set initial date to midnight of the current day
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      return midnight;
    }
  }

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Product Selling Finished!</span>;
    } else {
      return type === 1 ? (
        <div className={`countdown ${adClass}`}>
          <div className="countdown-row countdown-show4">
            <span className="countdown-section">
              <span className="countdown-amount">{zeroPad(days)}</span>
              <span className="countdown-period">DAYS</span>
            </span>

            <span className="countdown-section">
              <span className="countdown-amount">{zeroPad(hours)}</span>
              <span className="countdown-period">HOURS</span>
            </span>

            <span className="countdown-section">
              <span className="countdown-amount">{zeroPad(minutes)}</span>
              <span className="countdown-period">MINUTES</span>
            </span>
            <span className="countdown-section">
              <span className="countdown-amount">{zeroPad(seconds)}</span>
              <span className="countdown-period">SECONDS</span>
            </span>
          </div>
        </div>
      ) : (
        <div className="product-countdown-container font-weight-semi-bold">
          <span className="product-countdown-title">Offer Ends In:&nbsp;</span>

          <div className="product-countdown countdown-compact">
            <span className="countdown-section days">
              <span className="countdown-amount">{zeroPad(days)} </span>
              <span className="countdown-period">days,&nbsp;</span>
            </span>

            <span className="countdown-section hours">
              <span className="countdown-amount">
                {zeroPad(hours)}
                <span className="mr-1 ml-1">:</span>
              </span>
            </span>

            <span className="countdown-section minutes">
              <span className="countdown-amount">
                {zeroPad(minutes)}
                <span className="mr-1 ml-1">:</span>
              </span>
            </span>

            <span className="countdown-section seconds">
              <span className="countdown-amount">{zeroPad(seconds)}</span>
            </span>
          </div>
        </div>
      );
    }
  };

  return <Countdown date={new Date(date)} renderer={renderer}></Countdown>;
}
