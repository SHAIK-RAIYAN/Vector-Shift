import { useState } from 'react';
import { useStore } from './store';
import { SubmissionAlert } from './ui';
import { Play } from 'lucide-react';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = async () => {
        setError(null);
        setResult(null);
        try {
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nodes: nodes,
                    edges: edges
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setResult(data);
            setShowAlert(true);
        } catch (err) {
            setError(err.message);
            setShowAlert(true);
        }
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
        setResult(null);
        setError(null);
    };

    return (
        <>
            <button 
                type="button" 
                onClick={handleSubmit}
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '80px',
                    zIndex: 1001,
                    backgroundColor: 'var(--node-bg)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    padding: '10px 20px',
                    borderRadius: '12px',
                    fontWeight: 600,
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxShadow: 'var(--node-shadow)',
                    fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.3)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.boxShadow = 'var(--node-shadow)';
                }}
                onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'scale(0.95)';
                }}
                onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                }}
            >
                <Play width={16} height={16} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                <span>Submit</span>
            </button>
            {showAlert && (
                <SubmissionAlert
                    result={result}
                    error={error}
                    onClose={handleCloseAlert}
                />
            )}
        </>
    );
}
