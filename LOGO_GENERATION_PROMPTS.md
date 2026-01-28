# Logo Generation Prompts for Tributary AI

Use these prompts with Nano Banana Pro (Gemini) to generate the missing logo assets.

## Current Logo Description
The existing Tributary AI logo is a **stylized jellyfish/tributary design** with:
- Flowing, curved lines emanating downward (like water tributaries or jellyfish tentacles)
- **Teal/cyan color** (#0891b2 or similar)
- Minimalist, modern aesthetic
- Works on dark backgrounds currently

---

## REQUIRED ASSETS

### 1. Dark Mode Header Logo (logo-header-dark.png)
**Size needed:** 80x80 pixels (displayed at 40x40)
**Background:** Transparent PNG

**Prompt:**
```
A minimalist logo icon of a stylized jellyfish or water tributary, with flowing curved lines streaming downward. The design should be in WHITE or very light gray (#F8FAFC) color, suitable for display on dark backgrounds. Clean, modern, tech company aesthetic. Simple geometric curves, no gradients. Transparent background. Square format, centered composition.
```

---

### 2. Dark Mode Footer Logo (logo-footer-dark.png)
**Size needed:** 96x96 pixels (displayed at 48x48)
**Background:** Transparent PNG

**Prompt:**
```
A minimalist logo icon of a stylized jellyfish or water tributary, with flowing curved lines streaming downward. WHITE or very light gray color (#F8FAFC) for dark mode display. Clean, modern B2B technology company style. Elegant flowing lines suggesting data streams or water tributaries. Transparent background. Square format.
```

---

### 3. Monochrome Logo - Black (logo-mono-black.png)
**Size needed:** 512x512 pixels
**Background:** Transparent PNG
**Use case:** Print materials, single-color applications

**Prompt:**
```
A minimalist logo icon of a stylized jellyfish or water tributary with flowing curved lines streaming downward. Pure BLACK (#000000) color only. Clean geometric curves, modern tech aesthetic. Suitable for single-color printing and embossing. Transparent background. High resolution, crisp edges.
```

---

### 4. Monochrome Logo - White (logo-mono-white.png)
**Size needed:** 512x512 pixels
**Background:** Transparent PNG
**Use case:** Dark backgrounds, reversed applications

**Prompt:**
```
A minimalist logo icon of a stylized jellyfish or water tributary with flowing curved lines streaming downward. Pure WHITE (#FFFFFF) color only. Clean geometric curves, modern tech aesthetic. Suitable for dark backgrounds and reversed printing. Transparent background. High resolution, crisp edges.
```

---

### 5. Stacked/Vertical Logo with Text (logo-stacked.png)
**Size needed:** 400x500 pixels
**Background:** Transparent PNG
**Use case:** Email signatures, narrow layouts, social media

**Prompt:**
```
A vertical/stacked logo layout with a stylized jellyfish or tributary icon on top, and the word "TRIBUTARY" below it in a clean, modern sans-serif font. Teal/cyan color (#0891b2) for the icon, dark gray (#1F2937) for the text. Professional B2B technology company branding. Transparent background. The icon should be prominent, with text smaller below.
```

---

### 6. Stacked Logo - Dark Mode (logo-stacked-dark.png)
**Size needed:** 400x500 pixels
**Background:** Transparent PNG

**Prompt:**
```
A vertical/stacked logo layout with a stylized jellyfish or tributary icon on top, and the word "TRIBUTARY" below it in a clean, modern sans-serif font. WHITE color for both icon and text, suitable for dark backgrounds. Professional B2B technology company branding. Transparent background.
```

---

### 7. Social Media Profile Icon (logo-social.png)
**Size needed:** 400x400 pixels
**Background:** Solid teal (#0891b2)
**Use case:** LinkedIn, Twitter profile pictures

**Prompt:**
```
A minimalist logo icon of a stylized jellyfish or water tributary with flowing curved lines, in WHITE color, centered on a solid TEAL (#0891b2) circular or rounded square background. Clean, modern, instantly recognizable at small sizes. Professional B2B tech company aesthetic. The icon should be bold and simple enough to read at 48x48 pixels.
```

---

### 8. Favicon Optimized (favicon-optimized.png)
**Size needed:** 64x64 pixels (will be scaled to 16x16, 32x32)
**Background:** Transparent PNG
**Use case:** Browser tabs - must be recognizable at tiny sizes

**Prompt:**
```
An extremely simplified, bold version of a jellyfish or tributary logo icon. Must be recognizable at 16x16 pixels. Teal/cyan color (#0891b2). Very thick, simple curved lines - reduce detail for small size clarity. Transparent background. Think "app icon" simplicity.
```

---

### 9. OG Image Logo Badge (logo-badge.png)
**Size needed:** 200x200 pixels
**Background:** Transparent PNG
**Use case:** Watermark/badge on social sharing images

**Prompt:**
```
A stylized jellyfish or tributary logo icon with flowing curved lines. Teal/cyan color (#0891b2) with subtle transparency (80% opacity feel). Clean, modern aesthetic suitable for overlaying on images as a brand watermark. Transparent background.
```

---

## COLOR SPECIFICATIONS

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Primary Teal | #0891b2 | 8, 145, 178 | Main brand color, icons |
| Dark Text | #1F2937 | 31, 41, 55 | Text on light backgrounds |
| Light/White | #F8FAFC | 248, 250, 252 | Icons on dark backgrounds |
| Pure White | #FFFFFF | 255, 255, 255 | Dark mode, reversed |
| Pure Black | #000000 | 0, 0, 0 | Print, monochrome |

---

## FILE NAMING CONVENTION

After generation, save files as:
```
/public/logos/logo-header-dark.png
/public/logos/logo-footer-dark.png
/public/logos/logo-mono-black.png
/public/logos/logo-mono-white.png
/public/logos/logo-stacked.png
/public/logos/logo-stacked-dark.png
/public/logos/logo-social.png
/public/logos/favicon-optimized.png
/public/logos/logo-badge.png
```

---

## POST-GENERATION CHECKLIST

After generating assets:
- [ ] Verify transparent backgrounds are truly transparent
- [ ] Check colors match brand specs
- [ ] Test dark mode variants on dark backgrounds
- [ ] Test favicon at 16x16 for readability
- [ ] Optimize file sizes (use TinyPNG or similar)
- [ ] Update constants.ts with new asset paths if needed
- [ ] Implement dark mode switching in navigation.tsx and footer.tsx

---

## IMPLEMENTATION NOTES

Once you have the dark mode logos, the code changes needed are:

1. **Add to constants.ts:**
```typescript
LOGO_HEADER_DARK: "/logos/logo-header-dark.png",
LOGO_FOOTER_DARK: "/logos/logo-footer-dark.png",
```

2. **Update navigation.tsx** to use theme-aware logo:
```typescript
const { theme } = useTheme();
const logoSrc = theme === 'dark' ? ASSETS.LOGO_HEADER_DARK : ASSETS.LOGO_HEADER;
```

3. **Update footer.tsx** similarly for the footer logo.
