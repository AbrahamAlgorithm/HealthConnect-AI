import { Link } from 'react-router-dom';
import { FaUserMd, FaHeadSideMask } from 'react-icons/fa'; // Changed from FaUserDoctor
import { BsChatTextFill } from 'react-icons/bs';
import { HiSpeakerphone } from 'react-icons/hi';

const QuickActions = () => {
    const quickActionsDetails = [
        {
            actionIcon: FaHeadSideMask, // Changed from FaHeadSideVirus
            actionName: 'AI Symptoms Checker',
            actionFeature: 'Let our AI agent diagnose you',
            path: '/symptomchecker'
        },
        {
            actionIcon: FaUserMd, // Changed from FaUserDoctor
            actionName: 'Locate a Doctor Near You',
            actionFeature: 'Find Closest Hospitals',
            path: '/chat'
        },
        {
            actionIcon: BsChatTextFill,
            actionName: 'Request Consultations',
            actionFeature: 'Talk to a specialist',
            path: '/chat'
        },
        {
            actionIcon: HiSpeakerphone,
            actionName: 'Emergency',
            actionFeature: 'Request Immediate Help',
            path: '#'
        },
    ]

    return (
        <div className="quick-actions-container">
            <h2>Quick Actions</h2>
            <div className="actions-container">
                {quickActionsDetails.map((quickActionsDetail, index) => (
                    <Link 
                        to={quickActionsDetail.path} 
                        className="action-link" 
                        key={index}
                    >
                        <div className="action-container">
                            <div className="action-details">
                                <quickActionsDetail.actionIcon className="action-img" />
                                <div>
                                    <p>{quickActionsDetail.actionName}</p>
                                    <p>{quickActionsDetail.actionFeature}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default QuickActions;