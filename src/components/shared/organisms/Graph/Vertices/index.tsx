import { Vertex } from './Vertex'
import { useVertices } from './useVertices'

export const Vertices = () => {
  const { vertexRef, vertices, onDrag, selectedTw, onMouseDown, graphRef } =
    useVertices()

  return (
    <ul>
      {vertices?.map(({ color, index, label }, mapIndex) => (
        <Vertex
          key={mapIndex}
          index={index}
          label={label}
          color={color}
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
