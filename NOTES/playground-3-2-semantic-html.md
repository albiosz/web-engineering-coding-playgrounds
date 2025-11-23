
# Semantic HTML
Report on what happens when you try to navigate the page using a screen reader. Fix those navigation issues.

## Voice Over
- I used Voice Over as a screen reader to test the accessibility of the website

### Basic operations
"""
Steuerung erfolgt mit `VO = Control + Option`.

`VO + Shift + Pfeil nach oben/unten`
→ Eine Elementebene tiefer / breiter gehen

`VO + Pfeil rechts/links`
→ Element für Element weitergehen (Links, Text, Buttons usw.)

`VO + Leertaste`
→ Aktivieren/Öffnen eines Elements

`VO + U, dann Links/Rechts`
→ Kategorie wählen (z. B. „Headings“)

`VO + U, dann Hoch/Runter`
→ Ein Element aus der Kategorie auswählen


### Results
- it was difficult to navigate the website
- it did not feel like it has a proper structure
  - the were only two elements in the main structure of the website
- I couldn't fluently navigate the website by going from the main element into the sub elements

## Screen Reader Navigation Analysis

### How Screen Readers Navigate
Screen readers use several navigation methods:
- **Landmarks**: HTML5 semantic elements (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`) - users can jump directly between sections
- **Headings (h1-h6)**: Primary navigation method - users jump from heading to heading to understand page structure
- **Semantic Elements**: `<article>`, `<section>`, `<table>` - provide context and structure
- **Interactive Elements**: Links, buttons, forms - can be accessed separately

### Problems Found (Before Fix)

#### ❌ Problem 1: No Semantic Headings
- **Issue**: Used deprecated `<font size="7">`, `<font size="6">`, `<font size="5">` instead of `<h1>`, `<h2>`, `<h3>`
- **Impact**: Screen readers couldn't recognize the document structure, preventing users from navigating by headings

#### ❌ Problem 2: Missing Landmark Elements
- **Issue**: Used `<div class="header">` instead of `<header>` and `<div class="nav">` instead of `<nav>`
- **Impact**: Screen readers couldn't identify page regions, making it impossible to skip to navigation or main content
- **Example**: Navigation section was a generic `<div>` without semantic meaning

#### ❌ Problem 3: Deprecated HTML Tags
- **Issue**: `<font>` tag has been deprecated since HTML4
- **Impact**: Poor accessibility and invalid modern HTML

#### ❌ Problem 4: Excessive Line Breaks for Spacing
- **Issue**: Used `<br><br>` tags for spacing instead of CSS
- **Impact**: Screen readers announce every line break, creating a poor user experience

#### ❌ Problem 5: Table Headers Not Properly Marked
- **Issue**: Table headers used `<td>` instead of `<th>` in `<thead>`
- **Impact**: Screen readers couldn't associate data cells with their column headers
- **Missing**: No `scope` attributes and no table caption

#### ❌ Problem 6: Secondary Sidebar Not Marked as Aside
- **Issue**: Used `<div class="secondary">` instead of `<aside>`
- **Impact**: Screen readers couldn't identify this as complementary content

#### ❌ Problem 7: Interactive Div Instead of Button
- **Issue**: Used `<div class="show-hide">Show comments</div>` as an interactive element
- **Impact**: Screen readers don't recognize it as a button, not keyboard accessible (no tab-stop, no Enter/Space activation)

### Changes Implemented

#### ✅ Fix 1: Semantic Headings
- Replaced `<font size="7">` with `<h1>` (page title)
- Replaced `<font size="6">` with `<h2>` (article title, section titles)
- Replaced `<font size="5">` with `<h3>` (subsection titles)
- Updated CSS selectors to style h1, h2, h3 accordingly

#### ✅ Fix 2: Proper Landmark Elements
- Changed `<div class="header">` to `<header>`
- Changed `<div class="nav">` to `<nav>`
- Changed `<div class="secondary">` to `<aside class="secondary">`
- Updated CSS to use `header`, `nav`, and kept `.secondary` class for compatibility

#### ✅ Fix 3: Removed Deprecated Tags
- Removed all `<font>` tags and replaced with semantic alternatives
- Modern, valid HTML5 markup

#### ✅ Fix 4: Proper Content Structure
- Replaced `<br><br>` with `<p>` tags for paragraphs
- Content now properly structured for both visual and screen reader users

#### ✅ Fix 5: Accessible Table
- Changed `<td>` to `<th scope="col">` in table headers
- Added `<caption>Comparison of Bear Types</caption>` to describe table purpose
- Screen readers can now properly associate data with headers

#### ✅ Fix 6: Proper Document Structure
- Clear hierarchy: `<header>` → `<nav>` → `<main>` → `<article>` + `<aside>` → `<footer>`
- Screen readers can now navigate efficiently between page regions

#### ✅ Fix 7: Interactive Elements as Buttons
- Changed `<div class="show-hide">` to `<button class="show-hide">`
- Button is now:
  - Recognized by screen readers as an interactive element
  - Keyboard accessible (reachable via Tab key)


### Result
The page now has a clear, semantic structure that allows screen reader users to:
- Navigate by headings (h1 → h2 → h3)
- Jump between page landmarks (header, nav, main, aside, footer)
- Understand table structure and relationships
- Interact with buttons using keyboard (Tab, Enter, Space)
- Experience the content in a logical, accessible manner

All changes maintain the visual appearance while dramatically improving accessibility.

### Keyboard Navigation Test
Screen reader users can now:
1. **Tab through interactive elements**: Search input → Search button → Navigation links → Show/Hide Comments button → Form inputs
2. **Activate buttons with Enter or Space**: The "Show comments" button now responds to both keys
3. **Navigate by landmarks**: Jump directly to header, navigation, main content, sidebar, and footer
4. **Navigate by headings**: Jump through document structure using h1, h2, h3

