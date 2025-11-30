import { CommentSection } from './components/comment-section/CommentSection.tsx';

export const App: React.FC = () => {
  return (
    <div>
      <header>
        <h1>Welcome to our wildlife website</h1>
      </header>

      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Our team</a>
          </li>
          <li>
            <a href="#">Projects</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
        </ul>

        <form className="search">
          <label htmlFor="search-query" className="sr-only">
            Search the entire website
          </label>
          <input
            type="search"
            id="search-query"
            name="q"
            placeholder="Search query"
          />
          <input type="submit" value="Go!" />
        </form>
      </nav>

      <main>
        <article>
          <h2>The trouble with Bears</h2>
          <p>By Evan Wild</p>
          <p>
            Tall, lumbering, angry, dangerous. The real live bears of this world
            are proud, independent creatures, self-serving and always on the
            hunt for food.
          </p>
          <h3>Types of bear</h3>
          <table>
            <caption>Comparison of Bear Types</caption>
            <thead>
              <tr>
                <th scope="col">Bear Type</th>
                <th scope="col">Coat</th>
                <th scope="col">Adult size</th>
                <th scope="col">Habitat</th>
                <th scope="col">Lifespan</th>
                <th scope="col">Diet</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Wild</td>
                <td>Brown or black</td>
                <td>1.4 to 2.8 meters</td>
                <td>Woods and forests</td>
                <td>25 to 28 years</td>
                <td>Fish, meat, plants</td>
              </tr>
              <tr>
                <td>Urban</td>
                <td>North Face</td>
                <td>18 to 22</td>
                <td>Condos and coffee shops</td>
                <td>20 to 32 years</td>
                <td>Starbucks, sushi</td>
              </tr>
            </tbody>
          </table>

          <h3>Habitats and Eating habits</h3>
          <p>
            Wild bears eat a variety of meat, fish, fruit, nuts, and other
            natually growing ingredients...
          </p>
          <img src="media/wild-bear.jpg" alt="Wild bear in forest" />
          <p>
            Urban (gentrified) bears on the other hand have largely abandoned
            the old ways...
          </p>
          <img src="media/urban-bear.jpg" alt="Urban bear near buildings" />

          <h3>Mating rituals</h3>
          <p>Bears are romantic creatures by nature...</p>
          <audio controls aria-describedby="bear-audio-description">
            <source src="media/bear.mp3" type="audio/mp3" />
            <source src="media/bear.ogg" type="audio/ogg" />
            <p>
              It looks like your browser doesn't support HTML5 audio players.
            </p>
          </audio>

          <details className="audio-description">
            <summary>Audio description for hearing impaired users</summary>
            <div id="bear-audio-description">
              <p>
                The audio contains deep, resonant grunting and growling sounds
                typical of bears during mating season. The sounds are
                low-frequency (50-200Hz), with varying intensity patterns
                lasting approximately 8 seconds. These vocalizations help bears
                communicate their presence and readiness to mate.
              </p>
            </div>
          </details>

          <aside>
            <h3>About the author</h3>
            <p>Evan Wild is an unemployed plumber from Doncaster...</p>
          </aside>

          <CommentSection />

          <section className="more_bears">
            <h3>More Bears</h3>
          </section>
        </article>

        <aside className="secondary">
          <h2>Related</h2>
          <ul>
            <li>
              <a href="#">The trouble with Bees</a>
            </li>
            <li>
              <a href="#">The trouble with Otters</a>
            </li>
            <li>
              <a href="#">The trouble with Penguins</a>
            </li>
            <li>
              <a href="#">The trouble with Octopi</a>
            </li>
            <li>
              <a href="#">The trouble with Lemurs</a>
            </li>
          </ul>
        </aside>
      </main>

      <footer>
        <p>©Copyright 2050 by nobody. All rights reversed.</p>
      </footer>
    </div>
  );
};
