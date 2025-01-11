import React, { useState, useRef } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import SideBar from '../components/SideBar';
import TopSearchArea from '../components/TopSearchArea';

const SymptomsChecker = () => {
    const [symptoms, setSymptoms] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [results, setResults] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className='home-container'>
            <SideBar />
            <div className='home-contents'>
                <TopSearchArea />
                <div className='symptom-checker-container'>
                    <div className='symptom-header'>
                        <h1>Symptoms Checker</h1>
                        <p>Identify possible conditions and treatments for your symptoms</p>
                    </div>

                    <div className='symptom-main-content'>
                        <div className='symptom-input-section'>
                            <h2>Describe your symptoms</h2>
                            <textarea
                                placeholder="Example: I have a headache and fever..."
                                className='symptom-textarea'
                                onChange={(e) => setSymptoms(e.target.value)}
                            />
                            <button className='check-symptoms-btn'>
                                Check Symptoms
                            </button>
                        </div>

                        <div className='upload-section'>
                            <h2>Or Upload a picture for analysis</h2>
                            <div 
                                className='upload-box'
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current.click()}
                            >
                                {selectedImage ? (
                                    <img src={selectedImage} alt="Uploaded" className="uploaded-image" />
                                ) : (
                                    <>
                                        <FiUploadCloud className="upload-cloud-icon" />
                                        <p>Drag and drop or click to upload</p>
                                    </>
                                )}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                />
                            </div>
                        </div>

                        <div className='results-section'>
                            <h2>Analysis Results</h2>
                            <div className='results-container'>
                                {results ? (
                                    <div className='results-content'>
                                        {/* Results will be displayed here */}
                                    </div>
                                ) : (
                                    <p>Enter your symptoms or upload an image to get an analysis</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SymptomsChecker;