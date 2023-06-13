import { updateVertex } from '../vertex/updateVertex'

import { IVertex } from 'src/components/shared/organisms/Graph/Vertices/Vertex/types'

export const resetColors = (prevState: IVertex[]): IVertex[] => {
  let updatedVertices: IVertex[] = [...prevState]

  for (let i = 0; i < updatedVertices.length; i++)
    updatedVertices = updateVertex({
      prevState: updatedVertices,
      newVertex: {
        color: undefined,
        index: updatedVertices[i].index,
        label: updatedVertices[i].label,
        connections: updatedVertices[i].connections
      }
    })

  return [...updatedVertices]
}
