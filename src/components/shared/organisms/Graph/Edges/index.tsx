import { Edge } from './Edge'
import { useEdges } from './useEdges'

export const Edges = () => {
  const { updated, edgeColor } = useEdges()

  return (
    <svg className='w-full h-full absolute'>
      {updated?.map(({ path, vertices }) => (
        <Edge
          d={path}
          stroke={edgeColor}
          key={vertices[0].index + vertices[1].index}
        />
      ))}
    </svg>
  )
}
