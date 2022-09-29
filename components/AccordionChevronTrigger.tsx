import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

const AccordionChevronTrigger = ({ children, className }: Props) => (
  <Accordion.Header asChild>
    <Accordion.Trigger className={classNames('flex items-center space-x-2 group', className)}>
      <ChevronDownIcon className="w-5 h-5 group-radix-state-open:rotate-180" />
      {children}
    </Accordion.Trigger>
  </Accordion.Header>
)

export default AccordionChevronTrigger