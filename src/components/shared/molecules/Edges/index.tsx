import { useEdges } from './useEdges'

import { Edge } from 'src/components/shared/atoms/Edge'

export const Edges = () => {
  const { updated, edgeColor } = useEdges()

  return (
    <svg className='w-full h-full absolute -z-10'>
      {updated?.map(({ path, vertices }) => (
        <Edge d={path} key={vertices.toString()} stroke={edgeColor} />
      ))}
    </svg>
  )
}
