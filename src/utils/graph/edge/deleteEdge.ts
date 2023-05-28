import { IEdge } from '../../../components/shared/organisms/Graph/Edges/types'
import { IVertex } from '../../../components/shared/organisms/Graph/Vertices/Vertex/types'

type TDeleteEdge = (params: { prev?: IEdge[]; vertices: IVertex[] }) => IEdge[]

export const deleteEdge: TDeleteEdge = ({ vertices, prev }) =>
  prev?.filter(
    prevEdge =>
      !(
        prevEdge.vertices.find(({ index }) => index === vertices[0].index) &&
        prevEdge.vertices.find(({ index }) => index === vertices[1].index)
      )
  ) || []
