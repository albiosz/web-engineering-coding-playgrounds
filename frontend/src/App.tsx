import { Nav } from './components/nav/Nav.tsx';
import { Header } from './components/header/Header.tsx';
import { Footer } from './components/footer/Footer.tsx';
import { TypesOfBear } from './components/types-of-bear-table/TypesOfBear.tsx';
import { Intro } from './components/intro/Intro.tsx';
import { HabitatsAndEatingHabits } from './components/habitats-and-eating-habits/HabitatsAndEatingHabits.tsx';
import { MatingRituals } from './components/mating-rituals/MatingRituals.tsx';
import { AboutAuthor } from './components/about-author/AboutAuthor.tsx';
import { MoreBears } from './components/more-bears/MoreBears.tsx';
import { RelatedPages } from './components/related-pages/RelatedPages.tsx';

export const App: React.FC = () => {
  return (
    <>
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
    </>
  );
};
