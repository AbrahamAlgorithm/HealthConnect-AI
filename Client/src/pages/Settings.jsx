import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import TopSearchArea from '../components/TopSearchArea';
import { IoMdSettings } from "react-icons/io";
import { FaUserCircle, FaBell, FaLock, FaQuestionCircle, FaCamera } from "react-icons/fa";
import profileDp from '../Assets/Images/Profile DP.jpg';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState({
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        notifications: true,
        emailUpdates: true,
        twoFactor: false
    });

    return (
        <div className='home-container'>
            <SideBar />
            <div className='home-contents'>
                <TopSearchArea />
                <div className='settings-container'>
                    <div className='settings-header'>
                        <div className='settings-title'>
                            <IoMdSettings className="settings-icon" />
                            <div>
                                <h1>Account Settings</h1>
                                <p>Manage your profile and preferences</p>
                            </div>
                        </div>
                    </div>

                    <div className='settings-layout'>
                        <div className='settings-profile-card'>
                            <div className='profile-avatar'>
                                <img src={profileDp} alt="Profile" />
                                <div className='avatar-upload'>
                                    <FaCamera />
                                </div>
                            </div>
                            <h2>{formData.fullName}</h2>
                            <p>{formData.email}</p>
                            <div className='profile-status'>
                                <span className='status-badge'>Active</span>
                                <span className='member-since'>Member since 2024</span>
                            </div>
                        </div>

                        <div className='settings-main-content'>
                            <div className='settings-tabs'>
                                {['Profile', 'Security', 'Notifications', 'Support'].map(tab => (
                                    <button 
                                        key={tab}
                                        className={`tab-button ${activeTab === tab.toLowerCase() ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab.toLowerCase())}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className='settings-panel'>
                                {activeTab === 'profile' && (
                                    <div className='panel-content'>
                                        <h3>Personal Information</h3>
                                        <div className='form-grid'>
                                            <div className='form-group'>
                                                <label>Full Name</label>
                                                <input type="text" value={formData.fullName} />
                                            </div>
                                            <div className='form-group'>
                                                <label>Email Address</label>
                                                <input type="email" value={formData.email} />
                                            </div>
                                            <div className='form-group'>
                                                <label>Phone Number</label>
                                                <input type="tel" value={formData.phone} />
                                            </div>
                                            <div className='form-group'>
                                                <label>Location</label>
                                                <input type="text" placeholder="Enter your location" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'security' && (
                                    <div className='panel-content'>
                                        <h3>Security Settings</h3>
                                        <div className='security-options'>
                                            <div className='security-card'>
                                                <div className='security-header'>
                                                    <FaLock />
                                                    <h4>Password</h4>
                                                </div>
                                                <p>Last changed 30 days ago</p>
                                                <button className='change-btn'>Change Password</button>
                                            </div>
                                            <div className='security-card'>
                                                <div className='security-header'>
                                                    <FaUserCircle />
                                                    <h4>Two-Factor Auth</h4>
                                                </div>
                                                <p>Enhanced account security</p>
                                                <label className='switch'>
                                                    <input type="checkbox" checked={formData.twoFactor} />
                                                    <span className='slider'></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;