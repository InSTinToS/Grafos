import { IGraphContext } from './types'

import { IEdge } from './Edges/types'
import { IVertex } from './Vertices/Vertex/types'
import { IInfo } from './helpers/types'
import { addVertex } from './helpers/vertex/addVertex'
import { deleteVertex } from './helpers/vertex/deleteVertex'

import { createContext, useRef, useState } from 'react'

import colors from 'src/styles/custom/colors'

import { resetColors } from 'src/components/shared/organisms/Graph/helpers/colors/resetColors'
import { sequential } from 'src/components/shared/organisms/Graph/helpers/colors/sequential'
import { welshPowell } from 'src/components/shared/organisms/Graph/helpers/colors/welshPowell'

import { TInput } from 'src/types/react.types'

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

  console.log({ edges: edges.get(), vertices })

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

  const onColorizeClick = () => {
    if (algorithm === 'sequential') {
      const colorized = sequential({ prevState: resetColors(vertices) })

      setVertices(colorized.vertices)
      setInfo(colorized.info)
    }

    if (algorithm === 'welshPowell') {
      const colorized = welshPowell({ prevState: resetColors(vertices) })

      setVertices(colorized.vertices)
      setInfo(colorized.info)
    }
  }

  const onRemoveClick = (index: number) => {
    edges.set(
      edges
        .get()
        .filter(
          ({ vertices }) => !vertices.find(vertex => vertex.index === index)
        )
        .map(edge => ({
          ...edge,
          vertices: edge.vertices.filter(vertex => vertex.index !== index)
        }))
    )

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
