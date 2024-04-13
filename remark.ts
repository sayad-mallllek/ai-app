import {remark} from 'remark'
import remarkToc from 'remark-toc'

const doc = `
# Pluto

Pluto is a dwarf planet in the Kuiper belt.

## Contents

## History

### Discovery

In the 1840s, Urbain Le Verrier used Newtonian mechanics to predict the position of…

### Name and symbol

The name Pluto is for the Roman god of the underworld, from a Greek epithet for Hades…

### Planet X disproved

Once Pluto was found, its faintness and lack of a viewable disc cast doubt…

## Orbit

Pluto's orbital period is about 248 years…
`

const file = await remark()
  .use(remarkToc, {heading: 'contents', tight: true})
  .process(doc)

console.error(String(file))
