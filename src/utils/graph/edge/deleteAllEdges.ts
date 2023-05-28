import { IEdge } from '../../../components/shared/organisms/Graph/Edges/types'
import { IVertex } from '../../../components/shared/organisms/Graph/Vertices/Vertex/types'

import { MotionValue } from 'framer-motion'

export type TDeleteAllEdges = (params: {
  prevState: MotionValue<IEdge[]>
  index: IVertex['index']
}) => IEdge[]

export const deleteAllEdges: TDeleteAllEdges = ({ prevState, index }) =>
  prevState
    .get()
    .filter(edge => edge.vertices.every(vertex => vertex.index !== index))
