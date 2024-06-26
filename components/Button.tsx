import { View, Text } from 'react-native'
import React from 'react'
import { Button as BaseButton, styled, Stack, useTheme } from 'tamagui'

const Button = styled(BaseButton, {
  name: "Button",
  color: "$text",
  height: 50,
  borderRadius: 5,
  variants: {
    variant: {
      primary: {
        backgroundColor: "$primary",
      },
      secondary: {
        backgroundColor: "$foreground",
      }
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
})


export default Button