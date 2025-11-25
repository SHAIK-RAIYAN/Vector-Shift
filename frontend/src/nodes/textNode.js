// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  // Extract variables from {{variable}} pattern
  const extractVariables = (text) => {
    const regex = /\{\{([^}]+)\}\}/g;
    const matches = [];
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      const variableName = match[1].trim();
      if (variableName) {
        matches.push(variableName);
      }
    }
    
    // Return unique variables only
    return [...new Set(matches)];
  };

  // Generate handles based on extracted variables
  const generateHandles = () => {
    const variables = extractVariables(currText);
    const handles = [];

    // Add target handles for each variable on the LEFT
    variables.forEach((variable, index) => {
      handles.push({
        type: 'target',
        position: Position.Left,
        id: `${id}-${variable}`,
        label: variable,
        style: variables.length > 1 ? { top: `${((index + 1) * 100) / (variables.length + 1)}%` } : undefined
      });
    });

    // Add source handle for output on the RIGHT
    handles.push({
      type: 'source',
      position: Position.Right,
      id: `${id}-output`,
      label: 'output'
    });

    return handles;
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      handles={generateHandles()}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
          Text:
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            rows={1}
            style={{
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '12px',
              resize: 'none',
              overflow: 'hidden',
              minHeight: '24px',
              fontFamily: 'inherit'
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
}
