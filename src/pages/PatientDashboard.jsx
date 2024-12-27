import React from 'react'
import SideBar from '../components/SideBar';
import TopSearchArea from '../components/TopSearchArea';
import Greetings from '../components/Greetings';
import PatientDashboardFeatures from '../components/PatientDashboardFeatures';

const PatientDashboard = () => {
    return (
        <div className='patient-dashboard-container home-container'>
            <SideBar />
            <div className='patient-dashboard-contents home-contents'>
                <TopSearchArea />
                <Greetings />
                <PatientDashboardFeatures />
            </div>
        </div>
    )
}

export default PatientDashboard;