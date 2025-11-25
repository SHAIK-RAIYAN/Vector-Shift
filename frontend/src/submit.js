// submit.js

import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
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

            const result = await response.json();
            alert(`Nodes: ${result.num_nodes}\nEdges: ${result.num_edges}\nIs DAG: ${result.is_dag}`);
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button type="button" onClick={handleSubmit}>Submit</button>
        </div>
    );
}
