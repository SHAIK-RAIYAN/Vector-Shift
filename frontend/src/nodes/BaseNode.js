import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, data, title, children, handles = [] }) => {
  return (
    <div style={{
      width: 200,
      minHeight: 80,
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      boxShadow: 'var(--node-shadow)',
      backgroundColor: 'var(--node-bg)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      padding: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      position: 'relative'
    }}>
      {/* Title Section */}
      <div style={{
        fontWeight: 600,
        fontSize: '14px',
        color: 'var(--text-primary)'
      }}>
        {title}
      </div>

      {/* Content Section */}
      <div style={{ flex: 1, color: 'var(--text-primary)' }}>
        {children}
      </div>

      {/* Handles */}
      {handles.map((handleConfig, index) => (
        <div key={handleConfig.id || `${id}-handle-${index}`}>
          <Handle
            type={handleConfig.type}
            position={handleConfig.position}
            id={handleConfig.id}
            style={handleConfig.style}
          />
          {handleConfig.label && (
            <span
              style={{
                position: 'absolute',
                fontSize: '11px',
                color: 'var(--text-primary)',
                opacity: 0.7,
                top: handleConfig.style?.top || '50%',
                transform: 'translateY(-50%)',
                whiteSpace: 'nowrap',
                ...(handleConfig.position === Position.Left
                  ? { right: '100%', marginRight: '8px', textAlign: 'right' } 
                  : { left: '100%', marginLeft: '8px', textAlign: 'left' }    
                ),
              }}
            >
              {handleConfig.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

