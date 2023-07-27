import { ChevronDownIcon } from '@heroicons/react/20/solid'
import * as Accordion from '@radix-ui/react-accordion'
import classNames from 'classnames'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

const AccordionChevronTrigger = ({ children, className }: Props) => (
  <Accordion.Header asChild>
    <Accordion.Trigger className={classNames('flex gap-2 items-center group w-full py-2 px-3', className)}>
      <ChevronDownIcon className="w-6 h-6 group-radix-state-open:rotate-180" />
      {children}
    </Accordion.Trigger>
  </Accordion.Header>
)

export default AccordionChevronTrigger