import { IEdgesProps } from './types'

import { useEffect, useState } from 'react'

import { Edge } from 'src/components/shared/atoms/Edge'
import { IEdge } from 'src/components/shared/organisms/Graph/types'

export const Edges = ({ edges }: IEdgesProps) => {
  const [updated, setUpdated] = useState<IEdge[]>()

  useEffect(() => {
    edges.on('change', latest => {
      setUpdated(latest)
    })
  }, [edges])

  console.log({ edges: updated })

  return (
    <svg className='w-full h-full absolute -z-10 border border-red-500'>
      {updated?.map(({ path, vertices }) => (
        <Edge d={path} key={vertices.toString()} />
      ))}
    </svg>
  )
}
