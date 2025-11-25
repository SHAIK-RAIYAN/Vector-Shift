import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, data, title, children, handles = [] }) => {
  return (
    <div style={{
      width: 200,
      minHeight: 80,
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      backgroundColor: '#ffffff',
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
        color: '#374151'
      }}>
        {title}
      </div>

      {/* Content Section */}
      <div style={{ flex: 1 }}>
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
      color: '#6b7280',
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

