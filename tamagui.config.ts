// import { config } from '@tamagui/config/v3'


import { createFont, createMedia, createTamagui, createTokens } from 'tamagui'


const interFont = createFont({
  family: 'Inter, Helvetica, Arial, sans-serif',
  size: {
    1: 12,
    2: 14,
    3: 15,
    4: 16
  },
  lineHeight: {
    // 1 will be 22
    2: 22,
  },
  weight: {
    1: '300',
    // 2 will be 300
    3: '600',
  },
  letterSpacing: {
    1: 0,
    2: -1,
    // 3 will be -1
  },
  // (native only) swaps out fonts by face/style
  face: {
    300: { normal: 'InterLight', italic: 'InterItalic' },
    600: { normal: 'InterBold' },
  },
})

// Set up our tokens

// The keys can be whatever you want, but we do recommend keeping them
// consistent across the different token categories and intended for
// usage together to make nice designs - eg for a Button to use.

const size = {
  0: 0,
  1: 5,
  2: 10,
  true: 0
}

export const tokens = createTokens({
  size,
  space: { ...size, '-1': -5, '-2': -10 },
  radius: { 0: 0, 1: 3 },
  zIndex: { 0: 0, 1: 100, 2: 200 },
  color: {
    white: '#fff',
    black: '#000',
    primary: "#FCA110",
  },
})

const config = createTamagui({
  fonts: {
    // for tamagui, heading and body are assumed
    heading: interFont,
    body: interFont,
  },
  tokens,

  // For more on themes, see the Themes page
  themes: {
    light: {
      background: '#ffffff',
      foreground: "#E8E8E8",
      primary: tokens.color.primary,
      text: '#000'
    },
    dark: {
      background: '#0D0D0D',
      foreground: "#242424",
      primary: tokens.color.primary,
      text: "#fff"
    },
  },

  // For web-only, media queries work out of the box and you can avoid the
  // `createMedia` call here by passing the media object directly.
  // If you are going to target React Native, use `createMedia` (it's an identity
  // function on web so you can import it there without concern).
  media: createMedia({
    sm: { maxWidth: 860 },
    gtSm: { minWidth: 860 + 1 },
    short: { maxHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),

  // Shorthands
  // Adds <View m={10} /> to <View margin={10} />
  // See Settings section on this page to only allow shorthands
  // Be sure to have `as const` at the end
  shorthands: {
    px: 'paddingHorizontal',
    f: 'flex',
    m: 'margin',
    w: 'width',
    mx: 'marginHorizontal'
  } as const,

  // Change the default props for any styled() component with a name.
  // We are discouraging the use of this and have deprecated it, prefer to use
  // styled() on any component to change it's styles.
  defaultProps: {
    Text: {
      color: 'green'
    },
  },
})

// export const tamaguiConfig = createTamagui(config)

// export default tamaguiConfig

// export type Conf = typeof tamaguiConfig

// declare module 'tamagui' {
//   interface TamaguiCustomConfig extends Conf {}
// }

// type AppConfig = typeof config

declare module 'tamagui' {}

export default config;