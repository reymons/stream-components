const Document = ({ title, js, css, children }) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        {js.map((src, i) => (
          <script key={i} src={src} defer />
        ))}
        {css.map((src, i) => (
          <link key={i} href={src} rel="stylesheet" />
        ))}
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
};

export default Document;
