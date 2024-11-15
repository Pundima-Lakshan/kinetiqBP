import { useCallback } from 'react';
import { addEdge, Background, Controls, MiniMap, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { edges as initialEdges, nodes as initialNodes } from './initial-elements.tsx';
import { AnnotationNode } from './nodes/annotation-node.tsx';
import { ToolbarNode } from './nodes/toolbar-node.tsx';
import { ResizerNode } from './nodes/resize-node.tsx';
import { CircleNode } from './nodes/circle-node.tsx';
import { TextInputNode } from './nodes/text-input-node.tsx';
import { ButtonEdge } from './edges/button-edge.tsx';

const nodeTypes = {
  annotation: AnnotationNode,
  tools: ToolbarNode,
  resizer: ResizerNode,
  circle: CircleNode,
  textinput: TextInputNode,
};

const edgeTypes = {
  button: ButtonEdge,
};

const nodeClassName = (node) => node.type;

export const FlowComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      attributionPosition="top-right"
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      style={{ backgroundColor: '#F7F9FB' }}
    >
      <MiniMap zoomable pannable nodeClassName={nodeClassName} />
      <Controls />
      <Background />
    </ReactFlow>
  );
};
