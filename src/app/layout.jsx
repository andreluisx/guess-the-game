import { ThemeContext } from '../context/themeContext';
import './globals.css'

export default function RootLayout({ children }) {
  return (

    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeContext>
          {children}
        </ThemeContext>
      </body>
    </html>
  );
}
