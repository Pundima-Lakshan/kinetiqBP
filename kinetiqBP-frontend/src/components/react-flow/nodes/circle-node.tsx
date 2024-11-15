import { memo } from 'react';
import { Handle, Position, useStore } from '@xyflow/react';

const CircleNode_ = ({ id }: any) => {
  const label = useStore((s) => {
    const node = s.nodeLookup.get(id);

    if (!node) {
      return null;
    }

    return `Position x:${parseInt(node.position.x)} y:${parseInt(node.position.y)}`;
  });

  return (
    <div>
      <div>{label || 'no node connected'}</div>
      <Handle type="target" position={Position.Left} className="custom-handle" />
    </div>
  );
};

export const CircleNode = memo(CircleNode_);
