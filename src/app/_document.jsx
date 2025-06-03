// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Script no HEAD para evitar flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getTheme() {
                  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
                    return localStorage.getItem("theme");
                  }
                  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                }
                
                const theme = getTheme();
                document.documentElement.classList.toggle("dark", theme === "dark");
              })();
            `,
          }}
        />
      </Head>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
