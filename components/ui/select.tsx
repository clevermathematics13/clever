'use client'

import * as React from 'react'
import { Check, ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

const colors = {
  background: '#D9CFC9',       // taupe
  primary: '#C42020',          // metallic red
  foreground: '#4A4649',       // dark gray
  highlight: '#EEE8E4',        // hover shade
  shadow: '#2A1E1E'            // accent shadow
}

type SelectContextType = {
  selected: string[]
  setSelected: (value: string[]) => void
  open: boolean
  setOpen: (value: boolean) => void
  multi?: boolean
}

const SelectContext = React.createContext<SelectContextType | null>(null)

export function Select({
  children,
  multi = false
}: {
  children: React.ReactNode
  multi?: boolean
}) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<string[]>([])

  return (
    <SelectContext.Provider
      value={{ selected, setSelected, open, setOpen, multi }}
    >
      <Popover open={open} onOpenChange={setOpen}>
        {children}
      </Popover>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({ placeholder }: { placeholder?: string }) {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error('SelectTrigger must be used within Select')

  const { selected, setSelected, setOpen } = context

  return (
    <div className="relative flex w-full">
      <PopoverTrigger
        className="flex flex-1 items-center justify-between rounded-md border px-3 py-2 text-sm font-medium transition-colors shadow-sm hover:brightness-95"
        style={{
          backgroundColor: colors.background,
          color: colors.foreground,
          borderColor: colors.primary
        }}
      >
        <span>{selected.length > 0 ? selected.join(', ') : placeholder || 'Select'}</span>
        <ChevronDown className="ml-2 h-4 w-4 opacity-60" />
      </PopoverTrigger>
      {selected.length > 0 && (
        <button
          onClick={() => setSelected([])}
          className="absolute right-0 top-0 mr-8 mt-2 text-sm text-gray-500 hover:text-black"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}

export function SelectValue() {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error('SelectValue must be used within Select')
  return <span>{context.selected.join(', ')}</span>
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return (
    <PopoverContent
      className="w-[200px] p-0 border rounded-md shadow-lg"
      style={{
        backgroundColor: colors.background,
        borderColor: colors.primary
      }}
    >
      <Command>{children}</Command>
    </PopoverContent>
  )
}

export function SelectItem({
  value,
  children
}: {
  value: string
  children: React.ReactNode
}) {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error('SelectItem must be used within Select')

  const isSelected = context.selected.includes(value)

  const handleSelect = () => {
    if (context.multi) {
      context.setSelected(prev =>
        prev.includes(value)
          ? prev.filter(v => v !== value)
          : [...prev, value]
      )
    } else {
      context.setSelected([value])
      context.setOpen(false)
    }
  }

  return (
    <CommandItem
      onSelect={handleSelect}
      className="flex items-center px-3 py-2 text-sm font-medium cursor-pointer transition-colors"
      style={{
        backgroundColor: isSelected ? colors.primary : colors.background,
        color: isSelected ? 'white' : colors.foreground
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.backgroundColor = colors.highlight
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.backgroundColor = isSelected
          ? colors.primary
          : colors.background
      }}
    >
      <Check
        className={cn(
          'mr-2 h-4 w-4 transition-opacity',
          isSelected ? 'opacity-100' : 'opacity-0'
        )}
      />
      {children}
    </CommandItem>
  )
}

export function SelectSearch({ placeholder }: { placeholder?: string }) {
  return (
    <CommandInput
      placeholder={placeholder || 'Type to search...'}
      className="w-full rounded-md px-3 py-2 text-sm font-medium outline-none"
      style={{
        backgroundColor: colors.highlight,
        color: colors.foreground,
        border: `1px solid ${colors.primary}`
      }}
    />
  )
}

export function SelectList({ children }: { children: React.ReactNode }) {
  return <CommandList>{children}</CommandList>
}

export function SelectGroup({ children }: { children: React.ReactNode }) {
  return <CommandGroup>{children}</CommandGroup>
}

export function SelectEmpty({ children }: { children: React.ReactNode }) {
  return <CommandEmpty>{children}</CommandEmpty>
}
