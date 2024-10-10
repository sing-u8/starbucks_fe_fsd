"use client"

import * as React from "react"

import { Button } from "@/shared/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import Image from "next/image"

import CaretDownURL from "@/assets/svg/caret-down.svg?url"

interface BaseDropdownProps {
  defaultValue: string
  values: Array<DropdownValueType>
  onValueChange?: (value: string) => void
}

interface DropdownValueType {
  value: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

// note: This component is not completed yet.
function BaseDropdown({
  defaultValue,
  values,
  onValueChange,
}: BaseDropdownProps) {
  const [position, setPosition] = React.useState(defaultValue)
  const onChangeHandler = (value: string) => {
    setPosition(value)
    onValueChange?.(value)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex h-9 w-24 items-center justify-between px-0">
          <span className="text-sb-gray-200 text-base font-semibold">
            {position}
          </span>
          <Image
            src={CaretDownURL}
            alt="caret-down.svg"
            width={20}
            height={20}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={onChangeHandler}>
          {values.map((value, index) => (
            <DropdownMenuRadioItem
              key={index}
              value={value.value}
              className="text-sb-gray-200 text-base font-semibold">
              {value.value}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default BaseDropdown
