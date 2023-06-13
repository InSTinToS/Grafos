import { Edge } from './Edge'
import { useEdges } from './useEdges'

export const Edges = () => {
  const { updated, edgeColor } = useEdges()

  return (
    <svg className='w-full h-full absolute'>
      {updated?.map(({ path }, index) => (
        <Edge d={path} stroke={edgeColor} key={index} />
      ))}
    </svg>
  )
}
