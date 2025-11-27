export const DraggableNode = ({ type, label, icon: Icon }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className="draggable-node"
        onDragStart={(event) => onDragStart(event, type)}
        draggable
      >
          {Icon && (
            <Icon className="draggable-node-icon" />
          )}
          <span className="draggable-node-label">{label}</span>
      </div>
    );
  };
  