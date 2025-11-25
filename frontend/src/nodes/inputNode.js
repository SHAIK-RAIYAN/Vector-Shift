// inputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      handles={[
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-value`
        }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            style={{
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '12px'
            }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
          Type:
          <select 
            value={inputType} 
            onChange={handleTypeChange}
            style={{
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '12px'
            }}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
