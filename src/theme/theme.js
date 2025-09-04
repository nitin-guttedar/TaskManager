import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: '#ffffff',
    text: '#121212',
    border: '#e5e5e5',
    primary: '#0066cc',
  },
};

export const dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    card: '#111111',
    text: '#f5f5f5',
    border: '#222222',
    primary: '#5aa7ff',
  },
};
