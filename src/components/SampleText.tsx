export function SampleText({ boldWeight }: { boldWeight: number }) {
  return (
    <>
      <h1 style={{ fontWeight: boldWeight }}>About Google Fonts Chooser</h1>
      <p>
        While{" "}
        <a href="https://fonts.google.com" target="_blank">
          Google Fonts
        </a>{" "}
        has a great collection of fonts, its website is not ideal for browsing
        its collection. That is why <em>Google Fonts Chooser</em> exists.
      </p>
      <h2 style={{ fontWeight: boldWeight }}>Using the app</h2>
      <ol>
        <li>
          Click to select a font in the left sidebar. The font is now used in
          the main text.
        </li>
        <li>
          If the font is a{" "}
          <a
            href="https://fonts.google.com/knowledge/introducing_type/introducing_variable_fonts"
            target="_blank"
          >
            variable font
          </a>
          , sliders are available for you to test drive the Variable Font
          features.
        </li>
        <li>
          Switch between light and dark modes, and change the font size to see
          how the font looks in different environments. (
          <em>Note: DO NOT skip this step.</em>)
        </li>
        <li>
          You can filter the font list by selecting ‘Variable Fonts only’ and/or
          choosing one of the five categories.
        </li>
      </ol>
      <p>(More features will be available soon.)</p>
      <h2 style={{ fontWeight: boldWeight }}>And about this text</h2>
      <p>
        While this text contains information on how to use{" "}
        <em>Google Fonts Chooser</em>, its main purpose is to let you inspect
        the font you selected, including its variants, i.e.
      </p>
      <ul>
        <li>
          <strong style={{ fontWeight: boldWeight }}>Bold</strong>
        </li>
        <li>
          <em>Italic</em>
        </li>
        <li>
          <em>
            <strong style={{ fontWeight: boldWeight }}>Bold Italic</strong>
          </em>
        </li>
      </ul>
      <p>
        Not every font has{" "}
        <strong style={{ fontWeight: boldWeight }}>bold</strong>,{" "}
        <em>italic</em> or{" "}
        <em>
          <strong style={{ fontWeight: boldWeight }}>bold italic</strong>
        </em>{" "}
        styles<strong style={{ fontWeight: boldWeight }}>.</strong> Fonts having
        these weights and styles show the words{" "}
        <strong style={{ fontWeight: boldWeight }}>bold</strong>,{" "}
        <em>italic</em> and{" "}
        <em>
          <strong style={{ fontWeight: boldWeight }}>bold italic</strong>
        </em>{" "}
        in their respective styles. Otherwise, something else is shown instead.
        (Faux-bold and faux-italics are disabled in this app to make the absence
        of font styles more visible.)
      </p>
      <p>
        The weight of the text you set is for normal text. For bold text, the
        app increase the weight by 300, or set the weight to the maximum if
        adding 300 is not possible. In the latter case, the bold text becomes
        less distinguishable, or not distinguishable at all.
      </p>
    </>
  );
}
