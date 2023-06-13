import { TColorize } from '../types'
import { updateVertex } from '../vertex/updateVertex'
import { verifyAllColorized } from './verifyAllColorized'

import { IVertex } from 'src/components/shared/organisms/Graph/Vertices/Vertex/types'

import { getRandomColor } from 'src/utils/colors/getRandomColor'

const sortByIndex = (prevState: IVertex[]) =>
  prevState.sort((vertexA, vertexB) => vertexA.index - vertexB.index)

export const sequential: TColorize = ({ prevState }) => {
  let colorizedVertices: IVertex[] = prevState
  const colors: string[] = []

  colors.push(getRandomColor())

  colorizedVertices = updateVertex({
    prevState: colorizedVertices,
    newVertex: { ...colorizedVertices[0], color: colors[0] }
  })

  for (let i = 0; i < colors.length; i++) {
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

    const isAllColorized = verifyAllColorized(colorizedVertices)

    !isAllColorized && colors.push(getRandomColor())
  }

  let type: string

  const graphNotHaveConnections = colorizedVertices.find(
    ({ connections }) => connections.length !== 0
  )
    ? false
    : true

  const graphHaveIsolatedVertex = colorizedVertices.find(
    ({ connections }) => connections.length === 0
  )
    ? true
    : false

  if (graphNotHaveConnections) type = 'Nulo'
  else if (graphHaveIsolatedVertex) type = 'Não determinado'
  else if (colorizedVertices.length === colors.length) type = 'Completo'
  else if (colors.length === 2) type = 'Bipartido não nulo ou Árvore'
  else type = 'Não determinado'

  return {
    info: { colorsQuantity: colors.length, type },
    vertices: sortByIndex(colorizedVertices)
  }
}
