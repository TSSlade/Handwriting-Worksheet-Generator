# Project Description

I want to build a prototype webpage in JS Fiddle. The requirements are as follows:

1. A very simple web page
2. A text input field that accepts up to two dozen characters
3. Uses a specific typeface (font) that I can provide (and is fully licensed)
4. An image upload mechanism that will accept a static image of type JPG, PNG, PDF, WEBP, or GIF
5. The user-input contents from the text input field and the image upload mechanism are slotted into a defined template
6. The template is rendered as an HTML page for the user
7. The user clicks a button to produce a 1-page PDF from the HTML preview 8. The PDF downloads.

## General Specifications

The prototype is as follows:

![Example Worksheet](./worksheet-builder-template.png)

Here's a breakdown of what's going on:

1. Across the top margin: a line of text with `Name:` at a tab stop of ~.125" and `Date:`` at a tab stop of ~5" (on an 8-in page - you could convert those to relative positions).
2. The name/date line is actually double-layered.
    1. The rearmost layer is just whitespace rendered with a specific font I will (as a placeholder) call the <GUIDELINES-FONT>.
    2. The foregrounded layer contains the "Name:" and "Date:" text rendered with a font I will (as a placeholder) call the <SANS-SERIF-FONT>
3. A line of instructions below that first line of text reading `Color the tall letter boxes blue, the small letter boxes red, and the fall letter boxes yellow`, with a small image embedded just to the right of those instructions. 
4. The phrase entered by the user, rendered with the <FILLED-BOX-FONT>
5. A line of instructions below that line reading `Copy the sentence fitting the letters inside the letter size boxes`
6. The phrase entered by the user, rendered with the <EMPTY-BOX-FONT>
7. A line of instructions below that line reading `Copy the sentence fitting each word inside the word space on the writing lines`
8. The phrase entered by the user, rendered with the <GUIDELINES-FONT>
9. A line of instructions below that line reading `Draw the missing pieces and color`
10. A row containing 4 copies of the image uploaded by the user.
    1. Each image has been sized to take up 1/6th of the page.
    2. There is a margin of `~1/12th` of the page width before the first copy and after the last copy
    3. There is a `~1/12th` of the page width margin between the first copy and the second copy, and so forth.
11. Each copy of the image has been overlaid with a vertical line and a horizontal line that divide the image into quadrants.
    1. In each copy, a different quadrant has been obscured with a white box overlay, starting from the upper right quadrant in copy 1 and progressing clockwise to the upper left quadrant in copy 4.

### Specific Design Constraints

- Yes, assume the page size is US letter by default
- All elements must fit within the page. The page will be in landscape orientation.
- The placement of the `Name:` and `Date:` text should be done via horizontal offsets, not `\t` characters
- I will supply the names of the font myself; the template code should just use the placeholders I provided
- The fonts are available in .otf format 
- The fonts will be provided as base64-encoded assets rather than being hosted as .swf fonts
- The spacing of the lines of the page should be easily configurable via CSS. Make sure to leave clear instructions in the comments to make that easy to do, as I am not an expert in CSS
- The fonts we will use actually produce the guidelines used in the `<GUIDELINES-FONT>` portion of the template.
- It would be useful to have the HTML and CSS snippets needed to reproduce that effect, too. Those should be provided separately.
- Text should never wrap. It should be shrunk to fit horizontally.
- This prototype is starting with a 20-character limit for the text the user can input. It may be adjusted in the future if we find an elegant mechanism for dealing with over-long text inputs.
- The example image is here:
- The example image is in PNG format. It will be 100 px wide by 40 px tall
- We cannot assume the images uploaded by the user will be square. They may be rectangular (in either portrait or landscape orientation)
- Do not reshape the vertical dimension; adhere to the constraints imposed by the horizontal dimension.
- The image can be scaled as appropriate to fit the horizontal space constraints while preserving the aspect ratio.
- The white-out overlay can be done using a CSS mask
- The lines used to split the image into quadrants should be 2px wide and black in color
- The PDF should be landscape orientation only
- Margins should be 0.25"
- The PDF generator can embed the font in the PDF
- The app should allow a mix of uppercase, lowercase, numbers, and punctuation
- Characters not supported should be shown with fallback
- Since we are hosting this on JS Fiddle for now, please provide the required assets in three chunks (JS, HTML, and CSS) rather than in a single span of code.