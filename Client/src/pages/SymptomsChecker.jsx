import React, { useState, useRef, useEffect } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import SideBar from '../components/SideBar';
import TopSearchArea from '../components/TopSearchArea';
import { api } from '../services/router';
import { toast } from "react-toastify";

const SymptomsChecker = () => {
    const [symptoms, setSymptoms] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const fileInputRef = useRef(null);
    const [displayedText, setDisplayedText] = useState("");
    const [typingComplete, setTypingComplete] = useState(false);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            setIsLoading(true); // Start loading
            setResults(null); // Clear previous results
            setDisplayedText(""); // Clear displayed text
            setTypingComplete(false); // Reset typing state

            try {
                const formData = new FormData();
                formData.append('image', file); // Use the file uploaded by the user

                const response = await api.post("/api/v1/symptoms_checker", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                const data = response.data?.result; // Assuming the response contains a result array
                setResults(data); // Set array as result
            } catch (e) {
                console.error('Error:', e.response?.data?.detail || "Something went wrong");
                toast.error(e.response?.data?.detail || "Failed to process the request");
            } finally {
                setIsLoading(false); // Stop loading after the request is complete
            }
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true); // Start loading
        setResults(null); // Clear previous results
        setDisplayedText(""); // Clear displayed text
        setTypingComplete(false); // Reset typing state

        try {
            const formData = new FormData();
            if (selectedImage) {
                formData.append('image', selectedImage);
            }
            if (symptoms) {
                formData.append('symptom', symptoms);
            }

            const response = await api.post("/api/v1/symptoms_checker", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const data = response.data?.result; // This should be an array
            setResults(data); // Set array as result
        } catch (e) {
            console.error('Error:', e.response?.data?.detail || "Something went wrong");
            toast.error(e.response?.data?.detail || "Failed to process the request");
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        if (results) {
            simulateTypingEffect(results);
        }
    }, [results]);

    const simulateTypingEffect = (textArray) => {
        let currentIndex = 0;
        let currentText = "";

        setDisplayedText("");  // Reset displayed text
        setTypingComplete(false);  // Reset typing completion flag

        const typeNextCharacter = () => {
            if (currentIndex < textArray.length) {
                const line = textArray[currentIndex];

                currentText += line;
                setDisplayedText(currentText);

                currentIndex++;
            } else {
                clearInterval(interval);  // Stop the interval once all lines are typed
                setTypingComplete(true);
            }
        };

        const interval = setInterval(typeNextCharacter, 30);  // Faster typing speed
    };

    const formatResults = (resultsArray) => {
        return resultsArray.map((line, index) => {
            if (line.startsWith("###")) {
                // Heading lines
                return (
                    <h2 key={index} className="text-2xl font-bold mt-4">
                        {line.replace("###", "").trim()}
                    </h2>
                );
            } else if (line.includes("**")) {
                // Bold lines
                return (
                    <p key={index} className="font-bold text-lg mt-4">
                        {line.replace(/\*\*/g, "").trim()}
                    </p>
                );
            } else if (line.startsWith("1.") || line.startsWith("2.") || line.startsWith("3.")) {
                // List items
                return (
                    <p key={index} className="pl-4 mt-2">
                        {line.trim()}
                    </p>
                );
            } else {
                // Regular text
                return (
                    <p key={index} className="mt-2">
                        {line.trim()}
                    </p>
                );
            }
        });
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
                            <button className='check-symptoms-btn' onClick={handleSubmit} disabled={isLoading}>
                                {isLoading ? "Processing..." : "Check Symptoms"}
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
                                    <img src={URL.createObjectURL(selectedImage)} alt="Uploaded" className="uploaded-image" />
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

                        {isLoading && (
                            <div className="loading-indicator">
                                <p>Analyzing symptoms... Please wait.</p>
                            </div>
                        )}

                        {!results && !isLoading && (
                            <div className="results-section">
                                <h2>Analysis Results</h2>
                                <div className="results-container">
                                    <p>Your output result will display here after generated</p>
                                </div>
                            </div>
                        )}

                        {results && (
                            <div className="results-section">
                                <h2 className="text-xl font-semibold text-center mb-4">Analysis Results</h2>
                                <div className="results-container p-6 border border-gray-300 mt-6">
                                    <div className="results-content flex flex-col items-center">
                                        <h2 className="text-2xl font-bold">Diagnosis:</h2>
                                        <p className="diagnosis-text text-3xl font-bold text-center mb-2">

                                            {typingComplete && (
                                                <span className="typing-effect text-xl">{formatResults(results) || "No additional notes."}</span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SymptomsChecker;
