import { IVertex } from '../../../components/shared/organisms/Graph/Vertices/Vertex/types'

type TDeleteVertex = (params: {
  prevState: IVertex[]
  index: number
}) => IVertex[]

export const deleteVertex: TDeleteVertex = ({ prevState, index }) =>
  prevState.filter(vertex => vertex.index !== index)
