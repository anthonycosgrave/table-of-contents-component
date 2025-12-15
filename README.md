# 'table-of-contents' web component
A small, framework-agnostic Table of Contents web component built for a specific use case: generating an accessible table of contents for long-form articles in an Eleventy / FastHTML site.

This component was created while I was working on the FastHTML web accessibility series. I tried several existing Table of Contents solutions commonly recommended for Eleventy, but ran into repeated issues. In practice, it was quicker and more reliable to build a minimal component to do exactly what I needed. You can see if in action on any of the pages here: ["Web Accessibility with FastHTML"](https://anthonycosgrave.github.io/fasthtml-web-a11y/).

This is not intended to be a general-purpose or drop-in TOC solution. It solves a specific problem I had with a small, predictable feature set. 

This component prioritises clarity and native behaviour over flexibility. If you need a fully configurable or highly interactive Table of Contents, this may not be the right tool.

## Usage
By default, the component will match headings - ```h2 to h6```.

```html
<table-of-contents></table-of-contents>
```

### Custom selector
You can override this using the `selector` attribute to target only the heading elements you want.

```html
<table-of-contents selector="h1,h2,h3"></table-of-contents>
```

Headings must:
- be inside the page's `<main>`  
- have an `id` attribute (needed for anchor links)   

## Excluding headings using `data-toc-exclude`
To exclude a heading from the table of contents:

```html
<h2 data-toc-exclude>This heading will not appear in the table of contents!</h2>
```

## Accessibility considerations
This component intentionally relies on native HTML semantics rather than custom ARIA patterns or JavaScript-managed keyboard interaction.

### Landmark navigation
It is wrapped in a `<nav>` and an accessible name is provided via `aria-label` to help screen reader users quickly locate it.

### Progressive disclosure
The table of contents is wrapped in `<details>` and `<summary>` providing:
- built-in keyboard support (`Tab`, `Enter`, `Space`)
- No JS managed focus or state

## List and link semantics
Headings are renders as a nested ordered list (`<ol>` with `<li>`).

Each entry is a standard anchor link pointing to the corresponding header's `id`.

## Limitations
Due to time, there were some intentional trade-offs:
- Headings without an `id` will produce non-functional links  
- Heading numbers are generated visually using CSS. Making an assumption: screen readers rely on list hierarchy to convey structure.
- No active-section highlighting  
- Styling is very minimal and opinionated (it's high contrast for default 11ty light and dark modes).

## License

Code is licensed under the MIT License. See LICENSE file for details.

