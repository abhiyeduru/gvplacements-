export const theme = {
  colors: {
    bg: '#0a0a0f',
    bg2: '#111118',
    bg3: '#1a1a24',
    gold: '#f5a623',
    gold2: '#e8941a',
    goldDim: 'rgba(245,166,35,0.15)',
    goldBorder: 'rgba(245,166,35,0.3)',
    text: '#f0ede6',
    text2: '#a09e9a',
    text3: '#6b6966',
    border: 'rgba(255,255,255,0.08)',
    border2: 'rgba(255,255,255,0.14)',
    green: '#22c55e',
    red: '#ef4444',
  },
  radius: '12px',
  radiusLg: '18px',
};

export const globalStyles = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background: ${theme.colors.bg};
    color: ${theme.colors.text};
    min-height: 100vh;
    overflow-x: hidden;
  }
`;
