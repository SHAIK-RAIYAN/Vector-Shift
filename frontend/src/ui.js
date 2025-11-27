import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { DateNode, FilterNode, NoteNode, TransformNode, DatabaseNode } from './nodes/exampleNodes';
import { Sun, Moon, AlertCircle, CheckCircle2, XCircle, X, FileWarning } from 'lucide-react';
import { ButtonEdge } from './edges/ButtonEdge';

import 'reactflow/dist/style.css';

// ThemeToggle Component
export const ThemeToggle = ({ isDark, toggleTheme }) => {

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: '42px',
        height: '42px',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(1px)',
        WebkitBackdropFilter: 'blur(1px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        zIndex: 1000,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        e.currentTarget.style.transform = 'scale(1)';
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun width={24} height={24} style={{ color: '#fff' }} />
      ) : (
        <Moon width={24} height={24} style={{ color: '#111' }} />
      )}
    </button>
  );
};

// SubmissionAlert Component
export const SubmissionAlert = ({ result, error, onClose }) => {
  
  const [currentTheme, setCurrentTheme] = useState(() => 
    document.body.classList.contains('dark') ? 'dark' : 'light'
  );

  
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isDark = document.body.classList.contains('dark');
          setCurrentTheme(isDark ? 'dark' : 'light');
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  
  if (!result && !error) return null;

  const isDAG = result?.is_dag;
  const isEmpty = result?.num_nodes === 0;

  // Icon colors
  const successColor = '#10b981';
  const errorColor = '#ef4444'; 
  const emptyColor = '#3b82f6'; 
  
  
  const iconColor = error 
    ? errorColor
    : isEmpty
    ? emptyColor
    : isDAG 
    ? successColor
    : errorColor;

  
  const alertBg = currentTheme === 'dark'
    ? 'rgba(0, 0, 0, 0.8)' 
    : 'rgba(255, 255, 255, 0.8)';

  return (
    <div
      style={{
        position: 'fixed',
        top: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          backgroundColor: alertBg,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          minWidth: '300px',
          maxWidth: '500px',
          animation: 'slideDownFade 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: iconColor === successColor 
              ? 'rgba(16, 185, 129, 0.2)' 
              : iconColor === emptyColor
              ? 'rgba(59, 130, 246, 0.2)'
              : 'rgba(239, 68, 68, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          {error ? (
            <AlertCircle width={20} height={20} color={iconColor} strokeWidth={2.5} />
          ) : isEmpty ? (
            <FileWarning width={20} height={20} color={iconColor} strokeWidth={2.5} />
          ) : isDAG ? (
            <CheckCircle2 width={20} height={20} color={iconColor} strokeWidth={2.5} />
          ) : (
            <XCircle width={20} height={20} color={iconColor} strokeWidth={2.5} />
          )}
        </div>

        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {error ? (
            <div style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 600 }}>
              Error: {error}
            </div>
          ) : isEmpty ? (
            <>
              <div style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 600 }}>
                Pipeline is Empty
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-primary)', opacity: 0.8 }}>
                Add nodes to the canvas to build a pipeline.
              </div>
            </>
          ) : result ? (
            <>
              <div style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 600 }}>
                {isDAG ? 'Valid Pipeline' : 'Cycle Detected'}
              </div>
              <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-primary)', opacity: 0.8 }}>
                <span>Nodes: <strong>{result.num_nodes}</strong></span>
                <span>Edges: <strong>{result.num_edges}</strong></span>
                <span style={{ color: iconColor }}>
                  DAG: <strong>{result.is_dag ? 'Yes' : 'No'}</strong>
                </span>
              </div>
            </>
          ) : null}
        </div>

        
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            opacity: 0.6,
            transition: 'opacity 0.2s ease',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.6';
          }}
          aria-label="Close"
        >
          <X width={20} height={20} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  date: DateNode,
  filter: FilterNode,
  note: NoteNode,
  transform: TransformNode,
  database: DatabaseNode,
};

const edgeTypes = {
  default: ButtonEdge,
  buttonEdge: ButtonEdge,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [isDark, setIsDark] = useState(false);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    // Theme state management
    useEffect(() => {
      
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
      
      if (shouldBeDark) {
        document.body.classList.add('dark');
        setIsDark(true);
      } else {
        document.body.classList.remove('dark');
        setIsDark(false);
      }
    }, []);

    const toggleTheme = () => {
      const newIsDark = !isDark;
      setIsDark(newIsDark);
      
      if (newIsDark) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    };

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
        <div ref={reactFlowWrapper} style={{width: '100vw', height: '100vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
            >
                <Background color="#aaa" gap={gridSize} />
                <Controls />
                <MiniMap 
                    nodeColor={isDark ? "#555" : "#eee"}
                    maskColor={isDark ? "rgba(0,0,0, 0.8)" : "rgba(255,255,255, 0.8)"}
                    className="react-flow-minimap"
                    style={{
                        backgroundColor: isDark ? '#1a1a1a' : '#f9f9f9',
                        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e5e7eb'
                    }}
                />
            </ReactFlow>
        </div>
        </>
    )
}
