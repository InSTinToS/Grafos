import { TDeleteVertex } from '../types'

export const deleteVertex: TDeleteVertex = ({ prevState, index }) =>
  prevState
    .filter(vertex => vertex.index !== index)
    .map(state => ({
      ...state,
      connections: state.connections.filter(
        connection => connection.index !== index
      )
    }))
