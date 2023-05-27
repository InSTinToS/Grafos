import { IVertex } from 'src/components/shared/atoms/Vertex/types'
import { IEdge } from 'src/components/shared/molecules/Edges/types'

type TDeleteEdge = (params: { prev?: IEdge[]; vertices: IVertex[] }) => IEdge[]

export const deleteEdge: TDeleteEdge = ({ vertices, prev }) =>
  prev?.filter(
    prevEdge =>
      !(
        prevEdge.vertices.find(({ index }) => index === vertices[0].index) &&
        prevEdge.vertices.find(({ index }) => index === vertices[1].index)
      )
  ) || []
