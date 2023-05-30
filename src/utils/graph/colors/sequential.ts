import { updateVertex } from '../vertex/updateVertex'
import { getRandomColor } from './getRandomColor'
import { verifyAllColorized } from './verifyAllColorized'

import { IVertex } from 'src/components/shared/organisms/Graph/Vertices/Vertex/types'

export interface IInfo {
  colorsQuantity: number
}

export type TColorize = (params: { prevState: IVertex[] }) => {
  vertices: IVertex[]
  info: IInfo
}

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

  return {
    info: { colorsQuantity: colors.length },
    vertices: sortByIndex(colorizedVertices)
  }
}
