# Working with this project


# Development purposes

While developing this project, we want to run a lightweight web server.

```bash
$ cd ~/projects/for-anna/worksheet-gen
$ uv run python -m http.server 8000 --directory docs
# then visit http://localhost:8000/worksheet.html
```

To get the base64-encoded versions of fonts to use in our CSS, do the following:

```bash
$ base64 -w 0 ../assets/fonts/<FONT-NAME-HERE>.otf | xclip -sel clip
# Failure to pass in the `-sel clip` arguments to xclip will yield only the filename of the font

# or alternatively, to get the whole @font-face block
$ printf '@font-face { font-family: "<FILLED-BOX-FONT>"; src: url("data:font/otf;base64,'%s'") format("opentype"); }\n' "$(base64 -w0 ../assets/fonts/AbcBoxPrint-Regular.otf)" | xclip -sel clip

```

During development, if you need to enable `DEBUG MODE` while seeing how GitHub Pages is serving the site, enter the following in the Developer Tools console:

```js
// To turn it on
document.body.classList.add('debug');
// To turn it off
document.body.classList.remove('debug');
```

Alternatively, you can toggle `DEBUG_MODE` by appending `?debug=1` to the URL.

## Reference

In our [spec sheet](./docs/specs.md) we make reference to several fonts by a working name. The mapping to actual font names is as follows:

| Working Name      | Actual Font Name         | On disk                    |
| ----------------- | ------------------------ | -------------------------- |
| `SANS-SERIF-FONT` | AbcBox01Print            | AbcBoxPrint-Regular.otf        |
| ``                | AbcBox02Dotted           | AbcBoxDotted-Regular.otf       |
| `FILLED-BOX-FONT` | AbcBox3LetterSolid       | AbcBoxLetterSolid-Regular.otf  |
| ``                | AbcBox4LetterDotted      | AbcBoxLetterDotted-Regular.otf |
| ``                | AbcBox5Lines             | AbcBoxLines-Regular.otf        |
| `EMPTY-BOX-FONT`  | AbcBox6WordShape         | AbcBoxWordShape-Regular.otf    |
| `GUIDELINES-FONT` | AbcBox7WordLines Regular | AbcBoxWordLines-Regular.otf    |
| ``                | AbcBox8Word              | AbcBoxWord-Regular.otf         |


