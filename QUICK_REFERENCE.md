# TaskFlow Pro - Quick Reference Guide

## 🎨 Color Palette at a Glance

### Main Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Cream | #FAFAF7 | Page background |
| White | #FFFFFF | Cards & containers |
| Beige-600 | #B8A896 | Primary accent |
| Warm-800 | #9B8862 | Secondary accent |
| Beige-200 | #EBE7DC | Borders |
| Beige-900 | #5A5047 | Text |

## 🎯 Common CSS Classes

### Backgrounds
```css
/* Page background */
bg-gradient-to-br from-cream via-beige-50 to-warm-50

/* Card background */
bg-white/80 backdrop-blur-sm

/* Light background */
bg-beige-50

/* Hover background */
bg-beige-100
```

### Borders
```css
/* Standard border */
border border-beige-200

/* Rounded containers */
rounded-xl      /* 12px */
rounded-2xl     /* 16px */
```

### Shadows
```css
/* Default shadow */
shadow-elegant

/* Large shadow */
shadow-elegant-lg

/* Hover shadow */
shadow-elegant-hover
```

### Text
```css
/* Heading */
text-beige-900 font-bold

/* Body text */
text-beige-800 text-sm

/* Secondary text */
text-beige-700

/* Tertiary text */
text-beige-600
```

### Buttons
```css
/* Primary button */
bg-gradient-to-r from-beige-700 to-warm-800 text-white rounded-lg

/* Secondary button */
bg-beige-100 text-beige-900 rounded-lg

/* Button hover */
hover:shadow-elegant-hover
```

### Form Inputs
```css
/* Input field */
bg-beige-50 border border-beige-200 rounded-lg text-beige-900

/* Input focus */
focus:border-beige-600 focus:ring-2 focus:ring-beige-600/20
```

## 📐 Spacing Guide

| Size | Value | Usage |
|------|-------|-------|
| xs | 2 | Tiny gaps |
| sm | 4 | Small spacing |
| md | 6 | Medium spacing |
| lg | 8 | Large spacing |

## 🔤 Typography

| Element | Class | Usage |
|---------|-------|-------|
| H1 | text-2xl font-bold | Page titles |
| H2 | text-xl font-bold | Section titles |
| H3 | text-lg font-semibold | Subsections |
| Body | text-sm | Regular text |
| Small | text-xs | Helper text |

## 🎬 Animations

### Framer Motion
```tsx
/* Hover scale */
whileHover={{ scale: 1.05 }}

/* Press scale */
whileTap={{ scale: 0.95 }}

/* Fade in */
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}

/* Slide up */
initial={{ y: 20 }}
animate={{ y: 0 }}
```

## 🎨 Component Templates

### Card Component
```tsx
<div className="bg-white/80 backdrop-blur-sm rounded-xl border border-beige-200 p-6 shadow-elegant">
  {/* content */}
</div>
```

### Button (Primary)
```tsx
<button className="px-4 py-2 bg-gradient-to-r from-beige-700 to-warm-800 text-white rounded-lg hover:shadow-elegant-hover">
  Action
</button>
```

### Button (Secondary)
```tsx
<button className="px-4 py-2 bg-beige-100 text-beige-900 rounded-lg hover:bg-beige-200">
  Action
</button>
```

### Input Field
```tsx
<input
  className="w-full px-4 py-2 bg-beige-50 border border-beige-200 rounded-lg text-beige-900 focus:border-beige-600 focus:ring-2 focus:ring-beige-600/20"
  placeholder="Enter text..."
/>
```

### Modal
```tsx
<div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
  <div className="bg-white rounded-2xl p-8 w-full max-w-lg border border-beige-200 shadow-elegant-lg">
    {/* content */}
  </div>
</div>
```

## 🎯 Status Colors

| Status | Color | Hex |
|--------|-------|-----|
| To Do | Beige-400 | #D7D3C4 |
| In Progress | Beige-600 | #B8A896 |
| Completed | Beige-800 | #7A6F62 |

## 🚀 Quick Start

### 1. Update Tailwind Config
Add custom colors and shadows to `tailwind.config.js`

### 2. Use Color Classes
Apply beige and warm color classes to components

### 3. Add Shadows
Use `shadow-elegant`, `shadow-elegant-lg`, `shadow-elegant-hover`

### 4. Style Text
Use beige-900 for headings, beige-800 for body, beige-700 for secondary

### 5. Create Buttons
Use gradient from beige-700 to warm-800 for primary actions

## 📱 Responsive Breakpoints

```css
/* Mobile first */
/* sm: 640px */
/* md: 768px */
/* lg: 1024px */
/* xl: 1280px */
```

## ✅ Checklist for New Components

- [ ] Use white/80 or beige-50 for backgrounds
- [ ] Apply beige-200 borders
- [ ] Use beige-900 for text
- [ ] Add shadow-elegant for depth
- [ ] Use rounded-xl or rounded-2xl
- [ ] Implement hover states
- [ ] Add focus states for inputs
- [ ] Test on mobile
- [ ] Check contrast ratio
- [ ] Verify animations

## 🔗 File References

| File | Purpose |
|------|---------|
| tailwind.config.js | Color definitions |
| src/App.tsx | Main layout |
| src/components/AgentPanel.tsx | Sidebar |
| src/components/Dashboard.tsx | Analytics |
| src/components/TaskForm.tsx | Create task |
| src/components/TaskDetails.tsx | Task modal |
| REDESIGN_SUMMARY.md | Full details |
| COLOR_GUIDE.md | Color reference |

## 🎓 Best Practices

1. **Consistency**: Always use the defined color palette
2. **Hierarchy**: Use color to show importance
3. **Contrast**: Ensure text is readable
4. **Spacing**: Use consistent padding/margins
5. **Shadows**: Apply shadows for depth
6. **Animations**: Keep animations smooth and purposeful
7. **Accessibility**: Test with screen readers
8. **Performance**: Optimize for fast loading

## 🆘 Troubleshooting

### Colors not showing?
- Check Tailwind config is updated
- Verify color class names are correct
- Clear cache and rebuild

### Shadows not visible?
- Ensure shadow class is applied
- Check z-index doesn't hide shadow
- Verify background allows shadow visibility

### Text not readable?
- Check contrast ratio (should be 4.5:1+)
- Use beige-900 for text on light backgrounds
- Increase font size if needed

---

**Version**: 1.0
**Last Updated**: 2024
**Status**: Ready to Use ✅
