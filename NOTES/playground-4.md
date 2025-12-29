

# 1. Use React for the comment web component
- I have decided to firstly just migrate the `<comment-section />` custom web component to React and embed it in the DOM


## Tools
- [html to jsx](https://transform.tools/html-to-jsx)
  
## Sources
- [Add React to an Existing Project](https://react.dev/learn/add-react-to-an-existing-project)
- [Quick Start](https://react.dev/learn#adding-styles)


# 2. Migrate the whole body into React
- Next Step was to move all the html from index.html to App.tsx

1. I copied the HTML into the return expression.
2. Adjusted the HTML according to JSX format.


# 3. Migrate search highlighter
- the code from `searchHighlighter.ts` was migrated to `App.tsx`


# 4. Divide the main component into smaller components

Result:
```tsx
<div>
    <Header />
    <Nav />

    <main>
    <article>
        <Intro />
        <TypesOfBear />
        <HabitatsAndEatingHabits />
        <MatingRituals />
        <AboutAuthor />
        <MoreBears />
    </article>

    <aside className="secondary">
        <RelatedPages />
    </aside>
    </main>

    <Footer />
</div>
```

# 5. Create a Bear component for "More Bears" section

## Sources
- [Fetching Data In React](https://www.theodinproject.com/lessons/node-path-react-new-fetching-data-in-react#introduction)
- [Fetching data with effects](https://react.dev/reference/react/useEffect#fetching-data-with-effects)


# 6. CSS organization
- [x] remove inline styles from `index.html`
- [ ] move from the global `style.css` styles that are meant for single components
- [ ] `style.css` should contain only global styles
- [ ] `comment-section.css` should not leak the styles on `index.html`
  - [CSS modules](https://sachinamarasinghe.medium.com/mastering-the-art-of-scoped-css-in-react-a-stylish-guide-to-cleaner-safer-and-more-maintainable-ba3263df098d)
    - https://vite.dev/guide/features#css-modules
  - [styled components](https://dev.to/eransakal/how-to-isolate-component-styles-in-react-using-css-modules-mkm)
    - [styled-components - official website](https://styled-components.com/docs/basics)
  - [shadow dom](https://javascript.plainenglish.io/how-i-solved-css-conflicts-in-react-using-shadow-dom-and-portals-be3ee3f18aba)
  - [How I Solved CSS Conflicts in React Using Shadow DOM and Portals](https://javascript.plainenglish.io/how-i-solved-css-conflicts-in-react-using-shadow-dom-and-portals-be3ee3f18aba)


# Sources
- 