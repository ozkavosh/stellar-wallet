import 'styled-components'

declare module 'styled-components' {
  export interface IDefaultTheme {
    colors: {
      primary: '#FAFAFA'
      secondary: '#FFC80A'
      tertiary: '#303030'
      background: '#303030'
      text: '#000000'
      primaryTextColor: '#594F43'
      secondaryTextColor: '#777777'
      inputPlaceholder: '#C7C7C7'
      darkGrayText: '#303030'
      darkText: '#1A1A1A'
      black: '#000000'
      white: '#ffffff'
      dark: ''
      medium: ''
      light: ''
      danger: '#801515'
      success: '#66A15A'
    }
    fonts: {
      anekMalayalam: 'Anek Malayalam'
    }
    paddings: {
      container: '15px'
      pageTop: '30px'
    }
    margins: {
      pageTop: '30px'
    }
  }
}