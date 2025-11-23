# Audio
The `<audio>` player isn't accessible to hearing impaired people — can you add some kind of accessible alternative for these users?


## Result
- Added a panel that can be opened and closed with a transcription of the audio file
  - it can be opened and closed 

```html
<details class="audio-description">
    <summary>Audio description for hearing impaired users</summary>
    <div id="bear-audio-description">
        <p>The audio contains deep, resonant grunting and growling sounds typical of bears during mating season. The sounds are low-frequency (50-200Hz), with varying intensity patterns lasting approximately 8 seconds. These vocalizations help bears communicate their presence and readiness to mate.</p>
    </div>
</details>
```

- the Audio player received an extra WAI-ARIA-Attribut, so the screen readers can find it

```html
<audio controls aria-describedby="bear-audio-description">
```

- it is possible to see in the "Barrierefreiheit" tab that teh audio player has a relation with the description

```json
relations:{
    described by:
    containing document:"Wildlife Website - Buggy Starter"
}
```

# Sources
- [Accessible multimedia](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/Multimedia)
- [Inspiration](https://mdn.github.io/learning-area/accessibility/multimedia/audio-transcript-ui/)
