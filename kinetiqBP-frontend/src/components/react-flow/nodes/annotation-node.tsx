import { memo } from 'react';

export const AnnotationNode_ = ({ data }: { data: any }) => {
  return (
    <>
      <div className="annotation-content">
        <div className="annotation-level">{data.level}.</div>
        <div>{data.label}</div>
      </div>
      {data.arrowStyle && (
        <div className="annotation-arrow" style={data.arrowStyle}>
          ⤹
        </div>
      )}
    </>
  );
};

export const AnnotationNode = memo(AnnotationNode_);
