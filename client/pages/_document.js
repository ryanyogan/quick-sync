import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <link
            href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css"
            rel="stylesheet"
          />
        </Head>
        <body className="font-sans antialiased">
          <Main />
          <NextScript />

          <style jsx global>
            {`
              .gradient-primary {
                background-image: linear-gradient(
                  60deg,
                  #29323c,
                  0%,
                  #485563 100%
                );
              }
            `}
          </style>
        </body>
      </html>
    );
  }
}
