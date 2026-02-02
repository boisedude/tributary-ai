# UX Implementation Plan

## Overview
Align all inner pages with the homepage's clean, editorial design language. Focus on consistency and restraint - no new design flourishes.

---

## Task 1: Blog List Component
**File:** `/components/blog/blog-list.tsx`
**Priority:** High
**Estimated Changes:** Medium

### Changes:
1. Remove all Framer Motion imports and usage
2. Remove `whileHover={{ y: -8 }}` lift effect
3. Replace `hover:shadow-xl hover:shadow-primary/30` with `hover:border-primary transition-colors`
4. Remove `bg-gradient-to-br from-blue-500/20 to-teal-500/20` from image containers
5. Remove staggered animation delays (`delay: index * 0.1`)
6. Keep card grid layout (don't convert to editorial list)

---

## Task 2: Assessment Page
**File:** `/app/assessment/page.tsx`
**Priority:** High
**Estimated Changes:** Large

### Changes:
1. Remove `card-glow-teal` class from all cards
2. Left-align section headings (remove `text-center`)
3. Replace CheckCircle icons with simple bullets or numbers in lists
4. Simplify dimension cards - use simple bordered divs like homepage approach section
5. Keep pricing in a container but remove any glow/shadow effects
6. Keep 2x2 grid for dimensions (don't convert to numbered list)
7. Simplify deliverables section - use dividers instead of heavy cards

---

## Task 3: Contact Page
**File:** `/app/contact/page.tsx`
**Priority:** High
**Estimated Changes:** Medium

### Changes:
1. Remove `card-glow-teal` class
2. Convert FAQ cards to simple list/accordion format (bold question, text answer, divider)
3. Remove icon background boxes (`bg-accent/10` wrappers) - keep inline icons
4. Convert "What to Expect" CheckCircle list to numbered steps
5. Left-align headings where appropriate

---

## Task 4: Careers Page
**File:** `/app/careers/page.tsx`
**Priority:** Medium
**Estimated Changes:** Small

### Changes:
1. Remove any `card-glow-*` classes if present
2. Replace CheckCircle icons with simple bullets
3. Left-align section headings
4. Simplify "What We Look For" cards to match homepage style

---

## Task 5: Partners Page
**File:** `/app/partners/page.tsx`
**Priority:** Medium
**Estimated Changes:** Small

### Changes:
1. Remove any `card-glow-*` classes if present
2. Left-align section headings
3. Simplify icon treatments (remove colored background boxes if present)

---

## Task 6: About Page
**File:** `/app/about/page.tsx`
**Priority:** Low
**Estimated Changes:** Small

### Changes:
1. Left-align section headings (some are already left-aligned)
2. Simplify company grid if it feels too template-like
3. Remove any remaining icon background boxes

---

## Task 7: Global Consistency Audit
**Files:** Multiple
**Priority:** Medium
**Estimated Changes:** Small

### Changes:
1. Standardize section padding (`py-20` as default)
2. Standardize image treatment (`rounded-lg border` without shadows)
3. Audit heading sizes for consistency
4. Ensure CTA sections have intentional variation (not all identical)

---

## Implementation Order
1. Blog List (high traffic, high impact)
2. Assessment Page (primary conversion path)
3. Contact Page (conversion point)
4. Careers Page
5. Partners Page
6. About Page
7. Global audit

---

## Design Principles (Reference)
- **No Framer Motion** on page load - use CSS transitions only
- **No glow effects** - use simple borders
- **No gradient backgrounds** on cards/images
- **Left-aligned headings** - match homepage editorial style
- **Simple bullets** instead of CheckCircle icons
- **Keep functional cards** for pricing, contact info, blog grid
- **Remove decorative cards** for lists, FAQ, simple content
- **Inline icons** without colored background boxes
