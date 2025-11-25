// exampleNodes.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const DateNode = ({ id, data }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <BaseNode
      id={id}
      data={data}
      title="Date"
      handles={[
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-date`,
          label: 'date'
        }
      ]}
    >
      <div style={{ fontSize: '12px', color: '#6b7280' }}>
        {currentDate}
      </div>
    </BaseNode>
  );
};

export const FilterNode = ({ id, data }) => {
  const [filterCondition, setFilterCondition] = useState(data?.filterCondition || '');

  const handleFilterChange = (e) => {
    setFilterCondition(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input`,
          label: 'input'
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-output`,
          label: 'output'
        }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
          Condition:
          <input 
            type="text" 
            value={filterCondition} 
            onChange={handleFilterChange}
            placeholder="e.g., value > 10"
            style={{
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '12px'
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
};

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || '');

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Note"
      handles={[]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <textarea
          value={note}
          onChange={handleNoteChange}
          placeholder="Add your notes here..."
          rows={3}
          style={{
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: '12px',
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
        />
      </div>
    </BaseNode>
  );
};

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');

  const handleTransformChange = (e) => {
    setTransformType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input`,
          label: 'input'
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-output`,
          label: 'output'
        }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
          Type:
          <select 
            value={transformType} 
            onChange={handleTransformChange}
            style={{
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '12px'
            }}
          >
            <option value="uppercase">Uppercase</option>
            <option value="lowercase">Lowercase</option>
            <option value="reverse">Reverse</option>
            <option value="trim">Trim</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};

export const DatabaseNode = ({ id, data }) => {
  const [dbName, setDbName] = useState(data?.dbName || '');

  const handleDbNameChange = (e) => {
    setDbName(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Database"
      handles={[
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-connection`,
          label: 'connection'
        }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
          Database Name:
          <input 
            type="text" 
            value={dbName} 
            onChange={handleDbNameChange}
            placeholder="e.g., my_database"
            style={{
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '12px'
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
};

