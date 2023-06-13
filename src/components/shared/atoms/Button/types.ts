import { HTMLAttributes } from 'react'

export interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset'
}
