import React, { useState, useEffect } from 'react';

export default function Pier() {

    const [result, setResult] = useState('3.14');
    const [isLoading, setIsLoading] = useState(false);
    const [digits, setDigits] = useState('-'); 
    const [hue, setHue] = useState(0);

    const handleButtonClick = () => {
        if (window.Worker) {
            setIsLoading(true);
            setResult('Processing...');

            const myWorker = new Worker(new URL('../workers/calcPiWorker.js', import.meta.url));

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


    useEffect(() => {
        document.body.style.backgroundColor = `hsl(${hue}, 70%, 60%)`;
    }, [hue]);

    return (
        <div style={{ padding: '20px' }}>
            <h1>workπ</h1>
            <input
                type="range"
                min="0"
                max="360"
                value={hue}
                onChange={(e) => setHue(e.target.value)}
                style={{ width: '300px' }}
            />
            <h2>How many digits of π do you want?</h2>
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
            
            <div style={{
                overflowWrap: 'anywhere',
                textAlign: 'left',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <p style={{ marginTop: '20px',  maxWidth: '100vw'}}>{result}</p>
            </div>
        </div>
    );
}
