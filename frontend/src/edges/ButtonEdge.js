

import { BaseEdge, getSmoothStepPath, EdgeLabelRenderer, useReactFlow } from 'reactflow';
import { X } from 'lucide-react';

export const ButtonEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd }) => {
  const { deleteElements } = useReactFlow();
  
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const handleDelete = (event) => {
    event.stopPropagation();
    deleteElements({ edges: [{ id }] });
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <button
          onClick={handleDelete}
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'var(--node-bg)',
            border: '1px solid var(--border-color)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            transition: 'none',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            boxShadow: 'var(--node-shadow)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ef4444';
            e.currentTarget.style.borderColor = '#ef4444';
            const icon = e.currentTarget.querySelector('svg');
            if (icon) icon.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--node-bg)';
            e.currentTarget.style.borderColor = 'var(--border-color)';
            const icon = e.currentTarget.querySelector('svg');
            if (icon) icon.style.color = 'var(--text-primary)';
          }}
          aria-label="Delete edge"
        >
          <X size={12} style={{ color: 'var(--text-primary)' }} />
        </button>
      </EdgeLabelRenderer>
    </>
  );
};

