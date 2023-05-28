'use client'

import { IGraphProps } from './types'

import { Edges } from './Edges'
import { Vertices } from './Vertices'
import { GraphContext, useGraph } from './useGraph'

import colors from 'src/styles/custom/colors'

import { Close } from 'src/assets/icons/Close'

export const Graph = ({ vertexSize = 32, edgeColor }: IGraphProps) => {
  const {
    context,
    onSubmit,
    onResetClick,
    onLabelChange,
    onRemoveClick,
    onColorizeClick,
    onResetColorsClick
  } = useGraph()

  return (
    <GraphContext.Provider
      value={{
        vertexSize,
        edgeColor: edgeColor || colors.secondary[500],
        ...context
      }}
    >
      <main className='overflow-hidden w-screen h-screen flex'>
        <section className='p-4 flex flex-col shadow-lg'>
          <h1 className='mx-auto text-white-500 text-h2 shadow-md'>Grafos</h1>

          <header>
            <form onSubmit={onSubmit} className='flex flex-col space-y-4 p-4'>
              <input
                type='text'
                maxLength={1}
                onChange={onLabelChange}
                placeholder='Nome do vértice'
                className='border rounded-md p-3 text-lg shadow-md'
              />

              <button className='bg-info-600 py-3 text-white-500 rounded-xl font-semibold shadow-md'>
                Adicionar
              </button>

              <button
                onClick={onColorizeClick}
                type='button'
                className='bg-info-600 py-3 text-white-500 rounded-xl font-semibold shadow-md'
              >
                Colorir
              </button>

              <button
                onClick={onResetColorsClick}
                type='button'
                className='bg-info-600 py-3 text-white-500 rounded-xl font-semibold shadow-md '
              >
                Descolorir
              </button>

              <button
                onClick={onResetClick}
                type='button'
                className='bg-info-600 py-3 text-white-500 rounded-xl font-semibold shadow-md '
              >
                Apagar tudo
              </button>
            </form>
          </header>

          <ul className='p-4 space-y-2 flex-1 overflow-y-auto'>
            {context.vertices.map(vertex => (
              <li
                key={vertex.index}
                className='flex items-center justify-between text-lg font-bold text-white-500 px-4'
              >
                {vertex.label}

                <button onClick={() => onRemoveClick(vertex.index)}>
                  <Close />
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className='p-4 w-full '>
          <div ref={context.graphRef} className='h-full w-full relative'>
            <Edges />
            <Vertices />
          </div>
        </section>
      </main>
    </GraphContext.Provider>
  )
}
