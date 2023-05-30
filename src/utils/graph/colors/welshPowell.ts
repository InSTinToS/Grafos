import { TColorize, sequential } from './sequential'

import { IVertex } from 'src/components/shared/organisms/Graph/Vertices/Vertex/types'

const sortByConnectionsLength = (prevState: IVertex[]) =>
  prevState.sort(
    (vertexA, vertexB) =>
      vertexB.connections.length - vertexA.connections.length
  )

export const welshPowell: TColorize = ({ prevState }) => {
  const colorizedVertices: IVertex[] = sortByConnectionsLength(prevState)

  return sequential({ prevState: colorizedVertices })
}
