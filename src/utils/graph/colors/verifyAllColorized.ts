import { IVertex } from 'src/components/shared/organisms/Graph/Vertices/Vertex/types'

export const verifyAllColorized = (vertices: IVertex[]) =>
  !vertices.find(({ connections }) =>
    connections.find(({ color }) => color === undefined)
  )
