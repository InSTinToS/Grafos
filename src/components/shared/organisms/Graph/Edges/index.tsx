import { Edge } from './Edge'
import { useEdges } from './useEdges'

export const Edges = () => {
  const { updated, edgeColor } = useEdges()

  return (
    <svg className='w-full h-full absolute'>
      {updated?.map(({ path, vertices }) => (
        <Edge d={path} key={vertices.toString()} stroke={edgeColor} />
      ))}
    </svg>
  )
}
