import { FaHeadSideVirus } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { BsChatTextFill } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import { HiSpeakerphone } from "react-icons/hi";
import { Link } from "react-router-dom";

const QuickActions = () => {
    const quickActionsDetails = [
        {
            actionIcon: FaHeadSideVirus,
            actionName: 'AI Symptoms Checker',
            actionFeature: 'Let our AI agent diagnose you',
            // add a naviagtion to the AI Symptoms Checker page
            actionPath: '/ai-symptoms-checker'
        },
        {
            actionIcon: FaUserDoctor,
            actionName: 'Locate a Doctor Near You',
            actionFeature: 'Find Closest Hospitals',
        },
        {
            actionIcon: BsChatTextFill,
            actionName: 'Request Consultations',
            actionFeature: 'Talk to a specialist',
        },
        {
            actionIcon: HiSpeakerphone,
            actionName: 'Emergency',
            actionFeature: 'Request Immediate Help',
        },
    ]
    return (
        <div className="quick-actions-container">
            <h2>Quick Actions</h2>
            <div className="actions-container">
                {quickActionsDetails.map((quickActionsDetail) => {
                    return (
                        <Link to={'/'}>
                            <div className="action-container">
                                <div className="action-details">
                                    <quickActionsDetail.actionIcon className="action-img" />
                                    <div>
                                        <p>{quickActionsDetail.actionName}</p>
                                        <p>{quickActionsDetail.actionFeature}</p>
                                    </div>
                                </div>
                                <IoIosArrowForward style={{ fontSize: '30px', color: '#667185' }} />
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default QuickActions;