import { useVertices } from './useVertices'

import { Vertex } from 'src/components/shared/atoms/Vertex'

export const Vertices = () => {
  const { vertexRef, vertices, onDrag, selectedTw, onMouseDown, graphRef } =
    useVertices()

  return (
    <ul>
      {vertices?.map(({ index, label }) => (
        <Vertex
          key={index}
          index={index}
          label={label}
          onDrag={onDrag}
          className={selectedTw(index)}
          connections={[]}
          graphRef={graphRef}
          onMouseDown={onMouseDown}
          ref={ref => vertexRef(ref, index)}
        />
      ))}
    </ul>
  )
}
