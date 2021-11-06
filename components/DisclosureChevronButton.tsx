import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  open: boolean
}

const DisclosureChevronButton = ({ children, className, open }: Props) => (
  <Disclosure.Button className={classNames('flex items-center space-x-2', className)}>
    <ChevronDownIcon className={classNames('w-5 h-5', { 'transform rotate-180': open })} />
    {children}
  </Disclosure.Button>
)

export default DisclosureChevronButton