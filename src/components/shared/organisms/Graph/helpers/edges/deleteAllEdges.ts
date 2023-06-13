import { TDeleteAllEdges } from '../types'

export const deleteAllEdges: TDeleteAllEdges = ({ prevState, index }) =>
  prevState
    .get()
    .filter(edge => edge.vertices.every(vertex => vertex.index !== index))
