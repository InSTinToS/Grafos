import { IForwardVertex } from '../../../components/shared/organisms/Graph/Vertices/Vertex/types'

import { RefObject } from 'react'

type TUpdateEdge = (params: {
  refs: RefObject<IForwardVertex>['current'][]
}) => string

export const getUpdatedEdgePath: TUpdateEdge = ({ refs }) => {
  if (!refs[0] || !refs[1]) return ''

  const firstPoint = refs[0].getMotionValue()
  const secondPoint = refs[1].getMotionValue()

  return `M${firstPoint.x},${firstPoint.y} L${secondPoint.x},${secondPoint.y}`
}
