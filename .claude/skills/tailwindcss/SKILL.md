### Replace @layer utilities with @utility for custom utilities

Source: https://tailwindcss.com/docs/upgrade-guide

In v4, custom classes in @layer utilities are no longer picked up as true utilities. Use the @utility API instead so custom utilities work with variants like hover, focus, and lg.

```css
@layer utilities {
  .tab-4 {
    tab-size: 4;
  }
}
@utility tab-4 {
  tab-size: 4;
}
```

--------------------------------

### Customize theme with @theme directive

Source: https://tailwindcss.com/docs/adding-custom-styles

Use the @theme directive in your CSS to customize design tokens such as fonts, breakpoints, colors, and easing functions. The example defines a custom font, a 3xl breakpoint, an avocado color palette, and custom easing values.

```CSS
@theme {
  --font-display: "Satoshi", "sans-serif";
  --breakpoint-3xl: 120rem;
  --color-avocado-100: oklch(0.99 0 0);
  --color-avocado-200: oklch(0.98 0.04 113.22);
  --color-avocado-300: oklch(0.94 0.11 115.03);
  --color-avocado-400: oklch(0.92 0.19 114.08);
  --color-avocado-500: oklch(0.84 0.18 117.33);
  --color-avocado-600: oklch(0.53 0.12 118.34);
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);
  /* ... */
}
```

--------------------------------

### Core concepts > Functions and directives > Directives > @theme

Source: https://tailwindcss.com/docs/functions-and-directives

Use the `@theme` directive to define your project's custom design tokens, like fonts, colors, and breakpoints:

--------------------------------

### Define custom design tokens with @theme

Source: https://tailwindcss.com/docs/functions-and-directives

Use the @theme directive to define project design tokens like fonts, colors, breakpoints, and easing functions.

```css
@theme {  --font-display: "Satoshi", "sans-serif";  --breakpoint-3xl: 120rem;  --color-avocado-100: oklch(0.99 0 0);  --color-avocado-200: oklch(0.98 0.04 113.22);  --color-avocado-300: oklch(0.94 0.11 115.03);  --color-avocado-400: oklch(0.92 0.19 114.08);  --color-avocado-500: oklch(0.84 0.18 117.33);  --color-avocado-600: oklch(0.53 0.12 118.34);  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);  /* ... */}
```

--------------------------------

### Use the custom font-script utility in HTML

Source: https://tailwindcss.com/docs/theme

Apply the font-script utility class created by the @theme font variable to HTML elements.

```html
<p class="font-script">This will use the Great Vibes font family.</p>
```
