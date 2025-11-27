export const DraggableNode = ({ type, label, icon: Icon }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '80px', 
          height: '60px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '10px',
          backgroundColor: 'var(--node-bg)',
          border: '1px solid var(--border-color)',
          color: 'var(--text-primary)',
          boxShadow: 'var(--node-shadow)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          justifyContent: 'center', 
          flexDirection: 'column',
          padding: '12px',
          transition: 'all 0.2s ease',
          fontFamily: 'inherit',
          gap: '6px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--node-bg)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.2)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--node-bg)';
          e.currentTarget.style.boxShadow = 'var(--node-shadow)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        draggable
      >
          {Icon && (
            <Icon 
              width={20} 
              height={20} 
              style={{ color: 'var(--text-primary)' }} 
            />
          )}
          <span style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: 500 }}>{label}</span>
      </div>
    );
  };
  