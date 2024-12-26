import profileDp from '../Assets/Images/Profile DP.jpg';
import { FaSearch } from "react-icons/fa";

const TopSearchArea = () => {
  return (
    <div className='top-search-area'>
      <div className='search-area'>
        <FaSearch />
        <input type="text" placeholder='Search here...'/>
      </div>
      <img className='top-search-area-dp' src={profileDp} alt="User's profile display pics" />
    </div>
  )
}

export default TopSearchArea;