import { IVertex } from '../../../components/shared/organisms/Graph/Vertices/Vertex/types'

type TDeleteVertex = (params: {
  index: number
  prevState: IVertex[]
}) => IVertex[]

export const deleteVertex: TDeleteVertex = ({ prevState, index }) =>
  prevState
    .filter(vertex => vertex.index !== index)
    .map(state => ({
      ...state,
      connections: state.connections.filter(
        connection => connection.index !== index
      )
    }))
