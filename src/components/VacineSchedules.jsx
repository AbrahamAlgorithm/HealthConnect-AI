import { color } from 'chart.js/helpers';
import React from 'react'

const VacineSchedules = () => {
  const vaccinationData = [
    {
      vaccineName: 'Measles',
      VaccineStatus: 'Overdue',
      VaccineDate: '26, Dec 2024',
      assignedDoctor: 'Find a doctor',
    },
    {
      vaccineName: 'Polio',
      VaccineStatus: 'Noncore',
      VaccineDate: '27, Dec 2024',
      assignedDoctor: 'Dr Chen',
    },
    {
      vaccineName: 'Covid 19',
      VaccineStatus: 'Core',
      VaccineDate: '26, Dec 2024',
      assignedDoctor: 'Dr Smith',
    },
    {
      vaccineName: 'Hepatitis A',
      VaccineStatus: 'Core',
      VaccineDate: '30, Dec 2024',
      assignedDoctor: 'Dr Patel',
    },
    {
      vaccineName: 'Measles',
      VaccineStatus: 'Overdue',
      VaccineDate: '01, Jan 2025',
      assignedDoctor: 'Dr Alison',
    },
  ];

  const statusColors = [
    {
      status: 'Overdue',
      borderColor: "#F7C1CE",
      color: '#D03258',
      backgroundColor: '#FCEBEF',
    },
    {
      status: 'Noncore',
      borderColor: "#F7E1C1",
      color: '#F2A735',
      backgroundColor: '#FCF5EB',
    },
    {
      status: 'Core',
      borderColor: "#BDE8D3",
      color: '#27A468',
      backgroundColor: '#EAF8F1',
    },
  ];

  const findBorderColor = (vaccineStatus) => {
    const index = statusColors.findIndex((statusColor) => statusColor.status === vaccineStatus);
    return statusColors[index].borderColor;
  };

  const findColor = (vaccineStatus) => {
    const index = statusColors.findIndex((statusColor) => statusColor.status === vaccineStatus);
    return statusColors[index].color;
  }

  const findBgColor = (vaccineStatus) => {
    const index = statusColors.findIndex((statusColor) => statusColor.status === vaccineStatus);
    return statusColors[index].backgroundColor;
  }

  return (
    <div className='vaccine-schedules-container'>
      <h3 style={{ color: '#0B1C33', fontFamily: 'PlusJarkataSanLight', fontSize: '18px', marginBottom: '30px' }}>VACCINATION  SCHEDULE</h3>
      <div className='schedule-table-schema'>
        <p>Name</p>
        <p>Type</p>
        <p>Date</p>
        <p>Doctor</p>
      </div>
      <div className='schedule-table-data'>
        {vaccinationData.map((vaccinationDatum) => {
          return (
            <div className='schedule-table-datum'>
              <p>{vaccinationDatum.vaccineName}</p>
              <button style={{ border: `2px solid ${findBorderColor(vaccinationDatum.VaccineStatus)}`, color: `${findColor(vaccinationDatum.VaccineStatus)}`, backgroundColor: `${findBgColor(vaccinationDatum.VaccineStatus)}` }}>
                {vaccinationDatum.VaccineStatus}
              </button>
              <p>{vaccinationDatum.VaccineDate}</p>
              <button>{vaccinationDatum.assignedDoctor}</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default VacineSchedules;