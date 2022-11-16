import { ReactNode } from 'react'

type Props = {
  title: string
  description: string
  children?: ReactNode
}

const Message = ({ title, description, children }: Props) => (
  <div className="text-center">
    <h1 className="text-lg font-semibold mb-1">{title}</h1>
    <h2 className="text-gray-700">{description}</h2>
    {children}
  </div>
)

export default Message