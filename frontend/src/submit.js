import { useState } from 'react';
import { useStore } from './store';
import { SubmissionAlert } from './ui';
import { Play, Trash2 } from 'lucide-react';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes, shallow);
    const edges = useStore((state) => state.edges, shallow);
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

    const handleReset = () => {
        useStore.setState({ nodes: [], edges: [] });
        setResult(null);
        setError(null);
        setShowAlert(false);
    };

    const buttonBaseStyle = {
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
    };

    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '100px',
                    zIndex: 1001,
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center'
                }}
            >
                <button 
                    type="button" 
                    onClick={handleReset}
                    style={buttonBaseStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.backgroundColor = '#ef4444';
                        e.currentTarget.style.color = '#ffffff';
                        e.currentTarget.style.borderColor = '#ef4444';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.backgroundColor = 'var(--node-bg)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                    }}
                    onMouseDown={(e) => {
                        e.currentTarget.style.transform = 'scale(0.95)';
                    }}
                    onMouseUp={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                >
                    <Trash2 width={16} height={16} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                    <span>Reset</span>
                </button>
                <button 
                    type="button" 
                    onClick={handleSubmit}
                    style={buttonBaseStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.borderColor = 'rgba(138, 235, 131, 0.5)';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(117, 246, 123, 0.3)';
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
            </div>
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
