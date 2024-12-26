import React from 'react'
import SideBar from '../components/SideBar';
import TopSearchArea from '../components/TopSearchArea';
import Greetings from '../components/Greetings';
import HomeFeatures from '../components/HomeFeatures';

const Home = () => {
    return (
        <div className='home-container'>
            <SideBar />
            <div className='home-contents'>
                <TopSearchArea />
                <Greetings />
                <HomeFeatures />
            </div>
        </div>
    )
}

export default Home;