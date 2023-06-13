import { TDeleteEdge } from '../types'

export const deleteEdge: TDeleteEdge = ({ vertices, prev }) =>
  prev?.filter(
    prevEdge =>
      !(
        prevEdge.vertices.find(({ index }) => index === vertices[0].index) &&
        prevEdge.vertices.find(({ index }) => index === vertices[1].index)
      )
  ) || []
