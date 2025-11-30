

# 1. Use React for the comment web component
- I have decided to firstly just migrate the `<comment-section />` custom web component to React and embed it in the DOM

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