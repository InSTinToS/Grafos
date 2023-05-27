import { IVerticesProps } from './types'

import { useVertices } from './useVertices'

import { Vertex } from 'src/components/shared/atoms/Vertex'

export const Vertices = ({ graphRef, edges }: IVerticesProps) => {
  const { vertexRef, vertices, onDrag, onMouseDown } = useVertices({ edges })

  return (
    <ul>
      {vertices.map(({ index, label }) => (
        <Vertex
          key={index}
          index={index}
          label={label}
          onDrag={onDrag}
          connections={[]}
          graphRef={graphRef}
          onMouseDown={onMouseDown}
          ref={ref => vertexRef(ref, index)}
        />
      ))}
    </ul>
  )
}
