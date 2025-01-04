import { IoIosArrowForward } from "react-icons/io";
import DoctorDp from '../Assets/Images/Profile DP.jpg';
import { Link } from "react-router-dom";

const RecentConsults = () => {
  const consultantsDetails = [
    {
      consultantName: 'Dr Alison',
      consultantRole: 'Practitioner'
    },
    {
      consultantName: 'Dr Alison',
      consultantRole: 'Practitioner'
    },
    {
      consultantName: 'Dr Alison',
      consultantRole: 'Practitioner'
    },
    {
      consultantName: 'Dr Alison',
      consultantRole: 'Practitioner'
    },
  ]
  return (
    <div className="recent-consults-container">
      <div className="recent-consults-heading">
        <h2>Recent Consultations</h2>
        <Link>
          <p>See All <IoIosArrowForward /></p>
        </Link>
      </div>
      {consultantsDetails.map((consultantDetail) => {
        return (
          <div className="consultants-details">
            <div className="consultant-details-container">
              <div className="consultant-details">
                <div style={{ position: 'relative' }}>
                  <img src={DoctorDp} alt="" style={{ width: '50px', height: '50px' }} />
                  <div style={{ position: 'absolute', width: '10px', height: '10px', backgroundColor: "#04802E", borderRadius: '50%', right: '0', bottom: '10px', border: '2px solid #fff' }}></div>
                </div>
                <div>
                  <p className="consultant-name">{consultantDetail.consultantName}</p>
                  <p className="consultant-specialization">{consultantDetail.consultantRole}</p>
                </div>
              </div>
              <Link>
                <button>Message</button>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RecentConsults;