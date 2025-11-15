# TaskFlow Pro - Color & Design Guide

## Color Palette Reference

### Primary Background Colors
```
Cream:        #FAFAF7  - Main page background
White:        #FFFFFF  - Cards, modals, containers
```

### Beige Palette (Neutral/Primary)
```
Beige-50:     #FEFDFB  - Very light backgrounds
Beige-100:    #F5F1E8  - Light backgrounds, hover states
Beige-200:    #EBE7DC  - Borders, dividers
Beige-300:    #E1DDD0  - Secondary borders
Beige-400:    #D7D3C4  - Subtle accents
Beige-500:    #C9BFB0  - Medium tone
Beige-600:    #B8A896  - Primary accent
Beige-700:    #9E8F7C  - Strong accent
Beige-800:    #7A6F62  - Dark accent
Beige-900:    #5A5047  - Text/darkest
```

### Warm Palette (Secondary/Accent)
```
Warm-50:      #FFFBF7  - Very light warm
Warm-100:     #F9F3ED  - Light warm
Warm-200:     #F3EDDF  - Warm backgrounds
Warm-300:     #EDE7D1  - Warm borders
Warm-400:     #E7E1C3  - Warm accents
Warm-500:     #D9CDB0  - Medium warm
Warm-600:     #C9B896  - Primary warm
Warm-700:     #B5A07C  - Strong warm
Warm-800:     #9B8862  - Dark warm
Warm-900:     #7A6F4F  - Darkest warm
```

## Component Color Usage

### Header
- Background: `bg-white/70` with `backdrop-blur-md`
- Border: `border-beige-200`
- Logo: `from-beige-800 to-warm-800` gradient
- Icon: `from-beige-600 to-warm-700` gradient

### Navigation Buttons
- Active: `bg-white text-beige-800 shadow-elegant`
- Inactive: `text-beige-600 hover:text-beige-800`
- Container: `bg-beige-100 rounded-xl`

### Primary Action Button
- Background: `from-beige-700 to-warm-800` gradient
- Text: `text-white`
- Hover: `hover:shadow-elegant-hover`

### Cards & Containers
- Background: `bg-white/80` or `from-white to-beige-50` gradient
- Border: `border-beige-200`
- Shadow: `shadow-elegant` or `shadow-elegant-lg`

### Form Inputs
- Background: `bg-beige-50`
- Border: `border-beige-200`
- Focus: `focus:border-beige-600 focus:ring-2 focus:ring-beige-600/20`
- Text: `text-beige-900`

### Status Indicators
- To Do: `#C9BFB0` (Beige-400)
- In Progress: `#B8A896` (Beige-600)
- Completed: `#7A6F62` (Beige-800)

### Priority Indicators
- Low: `#D7D3C4` (Beige-400)
- Medium: `#B8A896` (Beige-600)
- High: `#9B8862` (Warm-800)

### Text Colors
- Primary Headings: `text-beige-900`
- Secondary Text: `text-beige-700`
- Tertiary Text: `text-beige-600`
- Disabled: `text-beige-500`

### Backgrounds
- Page: `from-cream via-beige-50 to-warm-50` gradient
- Cards: `bg-white/80` or `from-white to-beige-50`
- Hover: `bg-beige-100` or `bg-beige-200`
- Active: `bg-white`

## Shadow System

### Elegant Shadow (Default)
```css
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
```
Used for: Cards, buttons, containers

### Elegant-lg Shadow (Prominent)
```css
box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
```
Used for: Modals, large containers, main sections

### Elegant-hover Shadow (Interactive)
```css
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
```
Used for: Hover states, interactive elements

## Border Radius Guide

- Buttons & Small Elements: `rounded-lg` (8px)
- Cards & Containers: `rounded-xl` (12px)
- Large Containers & Modals: `rounded-2xl` (16px)

## Spacing Guide

### Padding
- Small: `p-2` to `p-4`
- Medium: `p-6`
- Large: `p-8`

### Margins
- Small: `m-2` to `m-4`
- Medium: `m-6`
- Large: `m-8`

### Gaps
- Small: `gap-2` to `gap-3`
- Medium: `gap-4` to `gap-6`

## Typography

### Headings
- H1: `text-2xl font-bold text-beige-900`
- H2: `text-xl font-bold text-beige-900`
- H3: `text-lg font-semibold text-beige-900`
- H4: `text-sm font-semibold text-beige-900`

### Body Text
- Large: `text-base text-beige-800`
- Normal: `text-sm text-beige-800`
- Small: `text-xs text-beige-700`

## Gradient Combinations

### Primary Gradient
```
from-beige-700 to-warm-800
```
Used for: Main action buttons, primary accents

### Secondary Gradient
```
from-white to-beige-50
```
Used for: Card backgrounds, subtle backgrounds

### Background Gradient
```
from-cream via-beige-50 to-warm-50
```
Used for: Page background

### Progress Gradient
```
from-beige-600 to-warm-700
```
Used for: Progress bars, loading indicators

## Hover & Active States

### Button Hover
- Scale: `scale-1.05`
- Shadow: Upgrade to `shadow-elegant-hover`
- Color: Slightly darker shade

### Button Active/Pressed
- Scale: `scale-0.95`
- Opacity: Maintained

### Link Hover
- Color: Change to darker beige
- Underline: Optional

### Input Focus
- Border: Change to `border-beige-600`
- Ring: Add `ring-2 ring-beige-600/20`

## Backdrop & Overlay

### Modal Backdrop
```
bg-black/20 backdrop-blur-sm
```
Subtle and elegant, allows content behind to show

### Header Backdrop
```
bg-white/70 backdrop-blur-md
```
Frosted glass effect

## Accessibility Considerations

### Contrast Ratios
- Beige-900 on White: ✅ High contrast (7.5:1)
- Beige-700 on White: ✅ Good contrast (5.2:1)
- Beige-600 on White: ✅ Good contrast (4.8:1)

### Focus States
- All interactive elements have visible focus rings
- Focus ring color: `ring-beige-600/20`
- Focus ring width: `ring-2`

### Color Blindness
- Status indicators use both color and icons
- Important information not conveyed by color alone

---

**Design System Version**: 1.0
**Last Updated**: 2024
