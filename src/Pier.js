import React, { useState } from 'react';

export default function Pier() {

    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

            myWorker.postMessage('start');
        } else {
            setResult('Web Workers are not supported in this browser');
        }
    };


    return (
        <div style={{ padding: '20px' }}>
            <h1>workπ</h1>
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
            <p style={{ marginTop: '20px' }}>Result: {result}</p>
        </div>
    );
}
