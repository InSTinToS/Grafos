import { updateVertex } from './vertex/updateVertex'

import { IVertex } from 'src/components/shared/organisms/Graph/Vertices/Vertex/types'

type TColorize = (params: { prevState: IVertex[] }) => IVertex[]

const colors = [
  '#73c2b1',
  '#b6ed79',
  '#cc97cf',
  '#135dfe',
  '#787051',
  '#25a417',
  '#50125d',
  '#8b4dd6',
  '#9c333f'
]

const sortByConnectionsLength = (prevState: IVertex[]) =>
  prevState.sort(
    (vertexA, vertexB) =>
      vertexB.connections.length - vertexA.connections.length
  )

const sortByIndexLength = (prevState: IVertex[]) =>
  prevState.sort((vertexA, vertexB) => vertexA.index - vertexB.index)

export const welshPowell: TColorize = ({ prevState }) => {
  let colorizedVertices: IVertex[] = sortByConnectionsLength(prevState)

  colorizedVertices = updateVertex({
    prevState: colorizedVertices,
    newVertex: { ...colorizedVertices[0], color: colors[0] }
  })

  for (let i = 0; i < colors.length; i++)
    for (let j = 0; j < colorizedVertices.length; j++) {
      const hasColor = colorizedVertices[j].color
      const isConnectedToColor = colorizedVertices[j].connections.find(
        ({ color }) => color === colors[i]
      )

      if (!hasColor && !isConnectedToColor)
        colorizedVertices = updateVertex({
          prevState: colorizedVertices,
          newVertex: { ...colorizedVertices[j], color: colors[i] }
        })
    }

  return sortByIndexLength(colorizedVertices)
}
