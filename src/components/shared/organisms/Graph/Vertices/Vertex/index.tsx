import { IForwardVertex, IVertexProps } from './types'

import { useVertex } from './useVertex'

import { forwardRef } from 'react'

import { motion } from 'framer-motion'

export const Vertex = forwardRef<IForwardVertex, IVertexProps>(
  (
    {
      index,
      label,
      color,
      graphRef,
      className,
      connections,
      onDrag: onDragProp,
      onMouseDown: onMouseDownProp
    },
    ref
  ) => {
    const { onDrag, onMouseDown, vertexStyle } = useVertex({
      ref,
      index,
      label,
      color,
      graphRef,
      onDragProp,
      connections,
      onMouseDownProp
    })

    return (
      <motion.li
        drag
        onDrag={onDrag}
        dragElastic={0}
        ref={ref as any}
        dragMomentum={false}
        onMouseDown={onMouseDown}
        dragConstraints={graphRef}
        className={`bg-white-500 text-primary-500 font-bold flex items-center justify-center border-primary-500 border-2 rounded-full absolute ${className}`}
        style={vertexStyle}
      >
        {label}
      </motion.li>
    )
  }
)

Vertex.displayName = 'Vertex'
