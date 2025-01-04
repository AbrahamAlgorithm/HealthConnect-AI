import { IoCalendarClearOutline } from "react-icons/io5";
import moment from 'moment';

const Greetings = () => {
  const date = moment(new Date());
  const formattedDate = date.format('Do MMMM, YYYY');

  return (
    <div className='top-greetings-container'>
      <div className="greetings">
        <h2>Welcome 404</h2>
        <p>It’s a sunny day today, we hope you’re taking good care of your health </p>
      </div>
      <div className="currrent-date">
        <IoCalendarClearOutline/>
        <div>
          <p>Date</p>
          <p>{formattedDate}</p>
        </div>
      </div>
    </div>
  )
}

export default Greetings;