import { IGraphContext } from './types'

import { IEdge } from './Edges/types'
import { IVertex } from './Vertices/Vertex/types'

import { createContext, useRef, useState } from 'react'

import colors from 'src/styles/custom/colors'

import { TInput } from 'src/types/react.types'

import { resetColors } from 'src/utils/graph/colors/resetColors'
import { IInfo, sequential } from 'src/utils/graph/colors/sequential'
import { welshPowell } from 'src/utils/graph/colors/welshPowell'
import { addVertex } from 'src/utils/graph/vertex/addVertex'
import { deleteVertex } from 'src/utils/graph/vertex/deleteVertex'

import { useMotionValue } from 'framer-motion'

export const GraphContext = createContext<IGraphContext>({
  vertexSize: 32,
  edgeColor: colors.secondary[500]
})

export const useGraph = () => {
  const [label, setLabel] = useState('')
  const [info, setInfo] = useState<IInfo>()
  const edges = useMotionValue<IEdge[]>([])
  const graphRef = useRef<HTMLDivElement>(null)
  const [vertices, setVertices] = useState<IVertex[]>([])
  const [algorithm, setAlgorithm] = useState('welshPowell')

  const onColorizeClick = () => {
    if (algorithm === 'sequential') {
      const colorized = sequential({ prevState: resetColors(vertices) })

      setVertices(colorized.vertices)
      setInfo({ colorsQuantity: colorized.info.colorsQuantity })
    }

    if (algorithm === 'welshPowell') {
      const colorized = welshPowell({ prevState: resetColors(vertices) })

      setVertices(colorized.vertices)
      setInfo({ colorsQuantity: colorized.info.colorsQuantity })
    }
  }

  const onResetColorsClick = () => {
    setVertices([...resetColors(vertices)])
  }

  const onResetClick = () => {
    setVertices([])
    edges.set([])
  }

  const onSelectChange = (e: any) => {
    setAlgorithm(e.target.value)
  }

  const onSubmit = (e: any) => {
    e.preventDefault()

    label && setVertices(addVertex({ prevState: vertices, label }))
  }

  const onLabelChange: TInput['onChange'] = event => {
    setLabel(event.target.value.toUpperCase())
  }

  const onRemoveClick = (index: number) => {
    setVertices(deleteVertex({ prevState: vertices, index }))
  }

  const context = { graphRef, edges, vertices, setVertices }

  return {
    info,
    context,
    onSubmit,
    onResetClick,
    onLabelChange,
    onRemoveClick,
    onSelectChange,
    onColorizeClick,
    onResetColorsClick
  }
}
