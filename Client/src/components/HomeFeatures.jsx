import QuickActions from './QuickActions';
import TestsResults from './TestsResults';
import HealthTips from './HeathTips'

const HomeFeatures = () => {
  return (
    <div className='home-features-container'>
      <div>
        <TestsResults />
        <QuickActions />
      </div>
      <HealthTips />
    </div>
  )
}

export default HomeFeatures;