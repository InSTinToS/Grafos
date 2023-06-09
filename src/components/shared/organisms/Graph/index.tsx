'use client'

import { IGraphProps } from './types'

import { Button } from '../../atoms/Button'
import { Edges } from './Edges'
import { Vertices } from './Vertices'
import { GraphContext, useGraph } from './useGraph'

import colors from 'src/styles/custom/colors'

import { Close } from 'src/assets/icons/Close'
import { Palette } from 'src/assets/icons/Palette'
import { Plus } from 'src/assets/icons/Plus'
import { Trash } from 'src/assets/icons/Trash'
import { Logo } from 'src/assets/images/Logo'

export const Graph = ({ vertexSize = 32, edgeColor }: IGraphProps) => {
  const {
    info,
    context,
    onSubmit,
    onResetClick,
    onLabelChange,
    onRemoveClick,
    onSelectChange,
    onColorizeClick,
    onResetColorsClick
  } = useGraph()

  return (
    <GraphContext.Provider
      value={{
        ...context,
        vertexSize,
        edgeColor: edgeColor || colors.secondary[500]
      }}
    >
      <main className='overflow-hidden w-screen h-screen flex'>
        <section className='p-4 flex flex-col shadow-lg'>
          <header>
            <div className='flex items-center space-x-2 justify-center'>
              <Logo className='h-12 w-12' />

              <h1 className='mx-auto text-white-500 text-[32px] font-semibold shadow-md'>
                Grafos
              </h1>
            </div>

            <form onSubmit={onSubmit} className='flex flex-col space-y-4 p-4'>
              <input
                type='text'
                maxLength={1}
                onChange={onLabelChange}
                placeholder='Nome do vértice'
                className='border rounded-md p-3 text-lg shadow-md'
              />

              <select
                id='algorithm'
                name='algorithm'
                onChange={onSelectChange}
                className='p-4 rounded-md bg-white-50'
              >
                <option value='welshPowell'>Welsh-Powell</option>
                <option value='sequential'>Sequencial</option>
              </select>

              <Button title='Adicionar' type='submit'>
                <Plus className='w-6 h-6 mr-2 ' />
              </Button>

              <Button
                onClick={onColorizeClick}
                className='bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 relative'
              >
                <div className='w-full h-full rounded-xl opacity-20 bg-black-500 absolute' />
                <Palette className='w-6 h-6 mr-2 relative z-10' />
                <span className='relative z-10'>Colorir</span>
              </Button>

              <Button
                onClick={onResetColorsClick}
                className='bg-gradient-to-r from-gray-200  via-gray-500 to-black-500'
              >
                <Palette className='w-6  mr-2 h-6' />
                Descolorir
              </Button>

              <Button onClick={onResetClick} className='bg-red-500'>
                <Trash className='h-6 mr-2 w-6' /> Apagar tudo
              </Button>
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

        <section className='absolute top-0 right-0 p-4 mr-6'>
          <header>
            <span className='text-white-500 text-lg font-semibold'>
              Informações do Grafo
            </span>

            <ul>
              <li className='text-white-500 font-semibold'>
                <span className='text-white-500 font-normal'>
                  Quantidade de cores:{' '}
                </span>
                {info?.colorsQuantity}
              </li>
            </ul>
          </header>
        </section>
      </main>
    </GraphContext.Provider>
  )
}
