import React from 'react'
import { router } from 'expo-router'
import { Button } from '~/components/ui/button'
import { ChevronLeft } from '~/lib/icons'

const StackScreenBackButton = () => {
  return (
    <Button
      variant="icon"
      size="icon"
      onPress={() => router.back()}
      noText
      className="border-[1px] border-border rounded-[12px] p-[6px]"
    >
      <ChevronLeft className="text-primary" />
    </Button>
  )
}

export { StackScreenBackButton }