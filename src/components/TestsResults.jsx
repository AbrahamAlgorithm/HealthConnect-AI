import { GiSkullWithSyringe } from "react-icons/gi";
import { FaHeartPulse } from "react-icons/fa6";
import { MdBloodtype } from "react-icons/md";
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const TestsResults = () => {
    const testResultDetails = [
        {
            testType: 'Blood Sugar',
            testIcon: GiSkullWithSyringe,
            recordedValue: 80,
            unit: 'mg / dL',
            status: 'Normal',
            mainColor: 'rgb(198, 126, 32)',
            secColor: '#F8DEBD'
        },
        {
            testType: 'Heart Rate',
            testIcon: FaHeartPulse,
            recordedValue: 98,
            unit: 'bpm',
            status: 'Normal',
            mainColor: '#F44034',
            secColor: '#DA818466',
        },
        {
            testType: 'Blood Pressure',
            testIcon: MdBloodtype,
            recordedValue: 102,
            unit: '/72 mmhg',
            status: 'Normal',
            mainColor: '#0B4F6C',
            secColor: '#D0FBFF',
        },
    ];

    return (
        <div className="test-results-container">
            {testResultDetails.map((testResultDetail) => {
                return (
                    <div className="test-result-container">
                        <div>
                            <testResultDetail.testIcon style={{color: testResultDetail.mainColor, backgroundColor: testResultDetail.secColor}} className="test-logo" />
                            <p>{testResultDetail.testType}</p>
                        </div>
                        <div>
                            <p style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                color: '#757575'
                            }}
                            >
                                <span style={{ fontSize: '50px', fontFamily: 'PlusJarkataSanLight' }}>{testResultDetail.recordedValue}</span><span style={{ fontFamily: 'PlusJarkataSanBold' }}>{testResultDetail.unit}</span>
                            </p>
                            <p style={{ padding: '5px 15px', borderRadius: '10px', backgroundColor: testResultDetail.secColor, marginTop: '20px', fontFamily: 'PlusJarkataSanBold', width: 'fit-content' }}>Normal</p>
                        </div>
                        <div className="chart" style={{ width: '100%', height: '50px' }}>
                            <Line
                                data={{
                                    labels: ['A', 'B', 'C', 'D', 'E'], // to be fetched from the 'testResultDetails' array from the tests that the user has done
                                    datasets: [
                                        {
                                            label: '',
                                            data: [0, 100, 50, 30, 80], // to be fetched from the 'testResultDetails' array from the tests that the user has done
                                            backgroundColor: testResultDetail.secColor,
                                            borderColor: testResultDetail.mainColor,
                                            fill: true
                                        },
                                    ],
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                    scales: { x: { display: false }, y: { display: false } },
                                    elements: { line: { tension: 0.4 }, point: { radius: 0 } },
                                }}
                            />
                        </div>
                    </div>
                )
            })}
            {/* <div className="test-result-container">
                <div>
                    <GiSkullWithSyringe className="test-logo" />
                    <p>Blood Sugar</p>
                </div>
                <div>
                    <p style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: '#757575'
                    }}
                    >
                        <span style={{ fontSize: '50px', fontFamily: 'PlusJarkataSanLight' }}>80</span><span style={{ fontFamily: 'PlusJarkataSanBold' }}>mg/dl</span>
                    </p>
                    <p style={{ padding: '5px 15px', borderRadius: '10px', backgroundColor: '#F8DEBD', marginTop: '20px', fontFamily: 'PlusJarkataSanBold', width: 'fit-content' }}>Normal</p>
                </div>
                <div className="chart" style={{ width: '100%', height: '50px' }}>
                    <Line
                        data={{
                            labels: ['A', 'B', 'C', 'D', 'E'], // Match labels with data
                            datasets: [
                                {
                                    label: 'Revenue',
                                    data: [0, 100, 50, 30, 80], // Match data with labels
                                    backgroundColor: '#F8DEBD',
                                    borderColor: 'rgb(198, 126, 32)',
                                    fill: true
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            scales: { x: { display: false }, y: { display: false } },
                            elements: { line: { tension: 0.4 }, point: { radius: 0 } },
                        }}
                    />
                </div>
            </div>
            <div className="test-result-container">
                <div>
                    <GiSkullWithSyringe className="test-logo" />
                    <p>Blood Sugar</p>
                </div>
                <div>
                    <p style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: '#757575'
                    }}
                    >
                        <span style={{ fontSize: '50px', fontFamily: 'PlusJarkataSanLight' }}>80</span><span style={{ fontFamily: 'PlusJarkataSanBold' }}>mg/dl</span>
                    </p>
                    <p style={{ padding: '5px 15px', borderRadius: '10px', backgroundColor: '#F8DEBD', marginTop: '20px', fontFamily: 'PlusJarkataSanBold', width: 'fit-content' }}>Normal</p>
                </div>
                <div className="chart" style={{ width: '100%', height: '50px' }}>
                    <Line
                        data={{
                            labels: ['A', 'B', 'C', 'D', 'E'], // Match labels with data
                            datasets: [
                                {
                                    label: 'Revenue',
                                    data: [0, 100, 50, 30, 80], // Match data with labels
                                    backgroundColor: '#F8DEBD',
                                    borderColor: 'rgb(198, 126, 32)',
                                    fill: true
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            scales: { x: { display: false }, y: { display: false } },
                            elements: { line: { tension: 0.4 }, point: { radius: 0 } },
                        }}
                    />
                </div>
            </div>
            <div className="test-result-container">
                <div>
                    <GiSkullWithSyringe className="test-logo" />
                    <p>Blood Sugar</p>
                </div>
                <div>
                    <p style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: '#757575'
                    }}
                    >
                        <span style={{ fontSize: '50px', fontFamily: 'PlusJarkataSanLight' }}>80</span><span style={{ fontFamily: 'PlusJarkataSanBold' }}>mg/dl</span>
                    </p>
                    <p style={{ padding: '5px 15px', borderRadius: '10px', backgroundColor: '#F8DEBD', marginTop: '20px', fontFamily: 'PlusJarkataSanBold', width: 'fit-content' }}>Normal</p>
                </div>
                <div className="chart" style={{ width: '100%', height: '50px' }}>
                    <Line
                        data={{
                            labels: ['A', 'B', 'C', 'D', 'E'], // Match labels with data
                            datasets: [
                                {
                                    label: 'Revenue',
                                    data: [0, 100, 50, 30, 80], // Match data with labels
                                    backgroundColor: '#F8DEBD',
                                    borderColor: 'rgb(198, 126, 32)',
                                    fill: true
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            scales: { x: { display: false }, y: { display: false } },
                            elements: { line: { tension: 0.4 }, point: { radius: 0 } },
                        }}
                    />
                </div>
            </div> */}
        </div>
    )
}

export default TestsResults;