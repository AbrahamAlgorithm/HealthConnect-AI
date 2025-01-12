import tipsPics from '../Assets/Images/Profile DP.jpg';

const HeathTips = () => {
  return (
    <div className='health-tips-container'>
      <h2>Health Tips</h2>
      <div className='tips-container'>
        <div className='tip-container'>
          <div className='tip-attached-pics-div'>
            <img src={tipsPics} className='tip-attached-pics' alt="" />
            <div style={{ backgroundColor: '#27A468', width: '10px', height: '10px', borderRadius: '50%', position: 'absolute', top: '0px', left: '45px', border: '2px solid #fff' }}></div>
          </div>
          <div className='tip-details'>
            <h3>Influenza (Flu)</h3>
            <p>
              Influenza, commonly known as the flu, is a contagious respiratory illness caused by influenza viruses. Symptoms include fever, cough, sore throat, muscle aches, and fatigue. It spreads through droplets from sneezes, coughs, or talking and can lead to severe complications like pneumonia in vulnerable populations.
            </p>
          </div>
          <p>Date</p>
        </div>
        <div className='tip-container'>
          <div className='tip-attached-pics-div'>
            <img src={tipsPics} className='tip-attached-pics' alt="" />
            <div style={{ backgroundColor: '#27A468', width: '10px', height: '10px', borderRadius: '50%', position: 'absolute', top: '0px', left: '45px', border: '2px solid #fff' }}></div>
          </div>
          <div className='tip-details'>
            <h3>Diabetes</h3>
            <p>
              Diabetes is a chronic condition characterized by high blood sugar levels. It occurs either when the pancreas does not produce enough insulin (Type 1) or when the body cannot effectively use the insulin it produces (Type 2). Symptoms include frequent urination, increased thirst, and fatigue. Long-term complications can affect the heart, kidneys, and eyes.
            </p>
          </div>
          <p>Date</p>
        </div>
        <div className='tip-container'>
          <div className='tip-attached-pics-div'>
            <img src={tipsPics} className='tip-attached-pics' alt="" />
            <div style={{ backgroundColor: '#27A468', width: '10px', height: '10px', borderRadius: '50%', position: 'absolute', top: '0px', left: '45px', border: '2px solid #fff' }}></div>
          </div>
          <div className='tip-details'>
            <h3>Hypertension</h3>
            <p>
              Hypertension, or high blood pressure, is a condition where the force of the blood against artery walls is consistently too high. It often has no symptoms but can lead to serious health problems like heart disease, stroke, and kidney failure. Lifestyle changes and medication can help manage this condition effectively.
            </p>
          </div>
          <p>Date</p>
        </div>
        <div className='tip-container'>
          <div className='tip-attached-pics-div'>
            <img src={tipsPics} className='tip-attached-pics' alt="" />
            <div style={{ backgroundColor: '#27A468', width: '10px', height: '10px', borderRadius: '50%', position: 'absolute', top: '0px', left: '45px', border: '2px solid #fff' }}></div>
          </div>
          <div className='tip-details'>
            <h3>Asthma</h3>
            <p>
              Asthma is a chronic respiratory condition that inflames and narrows the airways, causing difficulty breathing. Symptoms include wheezing, shortness of breath, chest tightness, and coughing, often triggered by allergens, exercise, or cold air. Asthma can be managed with medications and lifestyle adjustments.
            </p>
          </div>
          <p>Date</p>
        </div>
      </div>
    </div>
  )
}

export default HeathTips;
