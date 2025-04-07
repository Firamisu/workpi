import React, { useState } from 'react';

export default function Pier() {

    const [result, setResult] = useState('3.14');
    const [isLoading, setIsLoading] = useState(false);
    const [digits, setDigits] = useState('-'); 

    const handleButtonClick = () => {
        if (window.Worker) {
            setIsLoading(true);
            setResult('Processing...');

            const myWorker = new Worker(new URL('./calcPiWorker.js', import.meta.url));

            myWorker.onmessage = function (e) {
                setResult(e.data);
                setIsLoading(false);
                myWorker.terminate();
            };

            myWorker.onerror = function (error) {
                setResult('Error: ' + error.message);
                setIsLoading(false);
                myWorker.terminate();
            };

            const digitCount = parseInt(digits, 10);
            if (isNaN(digitCount) || digitCount < 1) {
                setResult('Please enter a valid number of digits');
                setIsLoading(false);
                return;
            }

            myWorker.postMessage(digitCount);
        } else {
            setResult('Web Workers are not supported in this browser');
        }
    };


    const handleInputChange = (e) => {
        const value = e.target.value;
        setDigits(value);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>workπ</h1>
            <h2>How many digits of pi you want?</h2>
            <input 
                type='number'
                value={digits}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder='Enter number of digits here'
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
            >
            </input>
            <button
                onClick={handleButtonClick}
                disabled={isLoading}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
            >
                {isLoading ? 'Processing...' : 'Calculate'}
            </button>
            
            <p style={{ marginTop: '20px',  maxWidth: '90vw'}}>{result}</p>
        </div>
    );
}
