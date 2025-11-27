import { X } from "lucide-react";
import { Handle, Position, useReactFlow } from "reactflow";

export const BaseNode = ({
  id,
  data,
  title,
  children,
  handles = [],
  style = {},
}) => {
  const { deleteElements } = useReactFlow();

  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  const defaultStyle = {
    width: 200,
    minHeight: 80,
    border: "1px solid var(--border-color)",
    borderRadius: "8px",
    boxShadow: "var(--node-shadow)",
    backgroundColor: "var(--node-bg)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    position: "relative",
  };

  const mergedStyle = { ...defaultStyle, ...style };

  return (
    <div style={mergedStyle}>
      {/* Title Section */}
      <div
        style={{
          fontWeight: 600,
          fontSize: "14px",
          color: "var(--text-primary)",
          position: "relative",
        }}>
        {title}

        <button
          onClick={handleDelete}
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-primary)",
            opacity: 0.5,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.color = "#ef4444";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0.5";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          aria-label="Delete node">
          <X width={12} height={12} />
        </button>
      </div>

      <div style={{ flex: 1, height: "100%", color: "var(--text-primary)" }}>
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
                position: "absolute",
                fontSize: "11px",
                color: "var(--text-primary)",
                opacity: 0.7,
                top: handleConfig.style?.top || "50%",
                transform: "translateY(-50%)",
                whiteSpace: "nowrap",
                ...(handleConfig.position === Position.Left
                  ? { right: "100%", marginRight: "8px", textAlign: "right" }
                  : { left: "100%", marginLeft: "8px", textAlign: "left" }),
              }}>
              {handleConfig.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
