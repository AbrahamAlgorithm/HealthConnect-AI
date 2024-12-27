import TestsResults from './TestsResults';
import RecentConsults from './RecentConsults';
import VacineSchedules from './VacineSchedules';

const PatientDashboardFeatures = () => {
    return (
        <div className='home-features-container'>
            <div>
                <TestsResults />
                <RecentConsults />
            </div>
            <VacineSchedules />
        </div>
    )
}

export default PatientDashboardFeatures;