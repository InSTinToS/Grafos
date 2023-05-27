import { IEdgesProps } from './types'

import { useEdges } from './useEdges'

import { Edge } from 'src/components/shared/atoms/Edge'

export const Edges = ({ edges }: IEdgesProps) => {
  const { updated, edgeColor } = useEdges({ edges })

  return (
    <svg className='w-full h-full absolute -z-10 border border-red-500'>
      {updated?.map(({ path, vertices }) => (
        <Edge d={path} key={vertices.toString()} stroke={edgeColor} />
      ))}
    </svg>
  )
}
