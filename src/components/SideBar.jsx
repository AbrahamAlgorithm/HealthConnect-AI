import logo from '../Assets/Images/image 16.png';
import profileDp from '../Assets/Images/Profile DP.jpg'
import { Link } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { FaHeadSideVirus } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import '../App.css';

const SideBar = () => {
    const sideBarNavs = [
        {
            navIcon: GoHome,
            navTitle: 'Home'
        },
        {
            navIcon: RxDashboard,
            navTitle: 'Patient Dashboard'
        },
        {
            navIcon: FaHeadSideVirus,
            navTitle: 'A Symptom Checker'
        },
        {
            navIcon: FaUserDoctor,
            navTitle: 'Locate doctor'
        },
        {
            navIcon: FaRegBell,
            navTitle: 'Activities'
        },
        {
            navIcon: IoSettingsOutline,
            navTitle: 'Settings'
        },
    ]
    return (
        <div className='sidebar-container'>
            <nav>
                <img src={logo} className='logo' alt="The Health Connect AI Logo" />
                <div>
                    {sideBarNavs.map((sideBarNav) => {
                        return (
                            <Link>
                                <sideBarNav.navIcon className='features-logo' />
                                <p>{sideBarNav.navTitle}</p>
                            </Link>
                        )
                    })}
                </div>
                <img className='sidebar-profile-dp' src={profileDp} alt="User's dp" />
            </nav>
        </div>
    )
}

export default SideBar