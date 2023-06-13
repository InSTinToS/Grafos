import { IButtonProps } from './types'

export const Button = ({
  children,
  className,
  type = 'button',
  ...props
}: IButtonProps) => (
  <button
    className={`bg-info-600 py-3 text-white-500 rounded-xl shadow-md flex items-center justify-center font-semibold ${className}`}
    type={type}
    {...props}
  >
    {children}
  </button>
)
