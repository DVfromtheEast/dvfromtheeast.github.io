import { createTheme } from '@mui/material/styles';
import '@fontsource-variable/noto-sans';

const DVTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#3db20f',
        contrastText: '#fafafa',
      },
      background: {
        default: mode === 'dark' ? '#020216' : '#fafafa',
        paper: mode === 'dark' ? '#25233a' : '#d1d1e5',
      },
      text: {
        primary: mode === 'dark' ? '#fafafa' : '#020216',
        secondary: mode === 'dark' ? '#d1d1e5' : '#25233a',
      },
    },
    typography: {
      h1: {
        fontSize: '4rem',
        lineHeight: '4.25rem',
        fontWeight: 600,
        fontFamily: 'Noto Sans Variable',
      },
      h2: {
        fontSize: '2.25rem',
        lineHeight: '3rem',
        fontWeight: 600,
        fontFamily: 'Noto Sans Variable',
      },
      h3: {
        fontSize: '1.75rem',
        lineHeight: '2.25rem',
        fontWeight: 600,
        fontFamily: 'Noto Sans Variable',
      },
      h4: {
        fontSize: '1.25rem',
        lineHeight: '1.5rem',
        fontWeight: 600,
        fontFamily: 'Noto Sans Variable',
      },
      subtitle1: {
        fontSize: '1rem',
        lineHeight: 1.5,
        fontWeight: 600,
        fontFamily: 'Noto Sans Variable',
      },
      subtitle2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
        fontWeight: 600,
        fontFamily: 'Noto Sans Variable',
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
        fontWeight: 500,
        fontFamily: 'Noto Sans Variable',
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.25,
        fontWeight: 500,
        fontFamily: 'Noto Sans Variable',
      },

      caption: {
        fontSize: '0.75rem',
        lineHeight: '1rem',
        fontWeight: 500,
        fontFamily: 'Noto Sans Variable',
      },
      button: {
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 2,
        fontFamily: 'Noto Sans Variable',
      },
    },
  });

export default DVTheme;
