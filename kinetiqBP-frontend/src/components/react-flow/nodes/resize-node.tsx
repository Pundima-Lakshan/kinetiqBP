import { memo } from 'react';
import { Handle, NodeResizer, Position } from '@xyflow/react';

const ResizerNode_ = ({ data }: any) => {
  return (
    <>
      <NodeResizer minWidth={50} minHeight={50} />
      <Handle type="target" position={Position.Left} className="custom-handle" />
      <div>{data.label}</div>
      <div className="resizer-node__handles">
        <Handle className="resizer-node__handle custom-handle" id="a" type="source" position={Position.Bottom} />
        <Handle className="resizer-node__handle custom-handle " id="b" type="source" position={Position.Bottom} />
      </div>
    </>
  );
};

export const ResizerNode = memo(ResizerNode_);
