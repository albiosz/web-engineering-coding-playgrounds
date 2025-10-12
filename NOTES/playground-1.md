

# FRAGEN
- [ ] Warum sehe ich manchmal 2 Bären und ein anderes Mal 5 Bären
  - Die Datei von von Wikipedia is immer gleich, oder? 
    - Ich sehe keinen Unterschied, wenn ich die mehrmals fetche
  - im JSON von Wikipedia gibt's 8 Bären
    1. Giant panda
    2. Spectacled bear
    3. Sun bear
    4. Sloth bear
    5. American black bear
    6. Asian black bear
    7. Brown bear
    8. Polar bear
  - manche Bären sind mehrmals zu sehen und die anderen, werden gar nicht dargestellt
  - `if (bears.length === rows.length)`
    - macht weniger Sinn 
    - `bears.length` - aktuelle Anzahl der Bären die verarbeitet wurden
    - `row.length` - (die Anzahlt der Bären)+1 die sich in aktuellen row befinden


```js
const walk = (node) => {
  if (node.nodeType === Node.TEXT_NODE) { // Text node 
    var match = node.nodeValue.match(regex);
    if (match) {
      var span = document.createElement('span');
      span.innerHTML = node.nodeValue.replace(regex, '<mark class="highlight">$1</mark>');
      
      // Insert all child nodes before the original node
      var parent = node.parentNode;
      var nextSibling = node.nextSibling;
      parent.removeChild(node);
      
      // Insert all span children at the original position
      while (span.firstChild) {
        parent.insertBefore(span.firstChild, nextSibling);
      }
    }
  } 
  else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE' && node.tagName !== 'FORM') {
    // Create a static NodeList to avoid issues with DOM changes during iteration
    const childNodes = Array.from(node.childNodes);
    childNodes.forEach(walk);
  }
}
```

# FEEDBACK
- try/catch Blöcke sollen klein sein
- in README.md sollen wir beschreiben

# Wikipedia JSON
```json
==Ursids==\nThe following classification is based on the taxonomy described by ''[[Mammal Species of the World]]'' (2005), with augmentation by generally accepted proposals made since using [[molecular phylogenetics|molecular phylogenetic analysis]]; this includes the division of the giant panda into two subspecies. There are several additional proposals which are disputed, such as reclassifying the subspecies of the brown bear into a smaller set of [[clade]]s,<ref name="BrownBearSubspecies1"/><ref name="BrownBearSubspecies2"/> which are not included here.

\n\n===Subfamily Ailuropodinae===\n{{Main article|Ailuropodinae}}\n{{Species table |no-note=y |genus=[[Ailuropoda]] |authority-name=[[Henri Milne-Edwards|H. Milne-Edwards]] |authority-year=1870 |species-count=one}}\n

- numOfBears = 1
{{Species table/row\n|name=[[Giant panda]] |binomial=A. melanoleuca\n|image=File:Grosser Panda.JPG |image-size=180px |image-alt=Black and white bear on ground\n|authority-name=[[Armand David|David]] |authority-year=1869 |authority-not-original=yes\n|subspecies={{Collapsible list |expand=yes |title=Two subspecies |bullets=on\n| ''A. m. melanoleuca''\n| ''A. m. qinlingensis'' ([[Qinling panda]])\n}}\n|range=Central China |range-image=File:Mapa distribuicao Ailuropoda melanoleuca.png |range-image-size=180px\n|size={{convert|150|–|180|cm|in|0|abbr=on}} long, plus {{convert|10|–|15|cm|in|0|abbr=on}} tail<br/>{{convert|80|–|123|kg|lb|0|abbr=on}}<ref name="ADWGiantpanda"/><ref name="Giantpandatail"/>\n|habitat=Forest<ref name="IUCNGiantpanda"/>\n|hunting=Eats only [[bamboo]]<ref name="IUCNGiantpanda"/>\n|iucn-status=VU |population=500–1,000\n|direction={{increase|Population increasing}}<ref name="IUCNGiantpanda"/>\n}}\n
{{Species table/end}}


- numOfBears = 1
\n\n===Subfamily Tremarctinae===\n{{Main article|Tremarctinae}}\n{{Species table |no-note=y |genus=[[Tremarctos]] |authority-name=[[Paul Gervais|Gervais]] |authority-year=1855 |species-count=one}}\n

{{Species table/row\n|name=[[Spectacled bear]] |binomial=T. ornatus\n|image=File:Spectacled Bear - Houston Zoo.jpg |image-size=180px |image-alt=Black bear with brown face on rock\n|authority-name=[[Frédéric Cuvier|F. Cuvier]] |authority-year=1825 |authority-not-original=yes\n|range=Andes mountains in South America |range-image=File:Tremarctos ornatus distribution.svg |range-image-size=159px\n|size={{convert|120|–|200|cm|in|0|abbr=on}} long, plus {{convert|7|cm|in|0|abbr=on}} tail<br/>{{convert|60|–|175|kg|lb|0|abbr=on}}<ref name="Spectacledbearsize"/>\n|habitat=Shrubland, grassland, and forest<ref name="IUCNSpectacledbear"/>\n|hunting=Primarily eats [[bromeliaceae|bromeliads]] and [[arecaceae|palm trees]], as well as cattle, other mammals, and fruit<ref name="IUCNSpectacledbear"/>\n|iucn-status=VU |population=2,500–10,000\n|direction={{decrease|Population declining}}<ref name="IUCNSpectacledbear"/>\n}}\n
{{Species table/end}}


- numOfBears = 1
\n\n===Subfamily Ursinae===\n{{Main article|Ursinae}}\n{{Species table |no-note=y |genus=[[Helarctos]] |authority-name=[[Thomas Horsfield|Horsfield]] |authority-year=1825 |species-count=one}}\n

{{Species table/row\n|name=[[Sun bear]] |binomial=H. malayanus\n|image=File:Sitting sun bear.jpg |image-size=119px |image-alt=Black bear with brown face and orange marking on chest on rock\n|authority-name=[[Stamford Raffles|Raffles]] |authority-year=1821 |authority-not-original=yes\n|subspecies={{Collapsible list |expand=yes |title=Two subspecies |bullets=on\n| ''H. m. euryspilus'' (Bornean sun bear)\n| ''H. m. malayanus'' (Malayan sun bear)\n}}\n|range=Southeast Asia (current range in brown, former in black) |range-image=File:Sun Bear area.png |range-image-size=172px\n|size={{convert|120|–|150|cm|in|0|abbr=on}} long, plus {{convert|3|–|7|cm|in|0|abbr=on}} tail<br/>{{convert|35|–|80|kg|lb|0|abbr=on}}<ref name="Sunbearsize"/><ref name="Sunbeartail"/>\n|habitat=Forest and shrubland<ref name="IUCNSunbear"/>\n|hunting=Primarily eats termites, ants, beetle larvae, bee larvae, honey, and fruit<ref name="IUCNSunbear"/>\n|iucn-status=VU |population=50,000<ref name="Bearpop"/>\n|direction={{decrease|Population declining}}<ref name="IUCNSunbear"/>\n}}\n
{{Species table/end}}


- numOfBears = 1
\n{{Species table |no-note=y |genus=[[Melursus]] |authority-name=[[Friedrich Albrecht Anton Meyer|Meyer]] |authority-year=1793 |species-count=one}}\n

{{Species table/row\n|name=[[Sloth bear]] |binomial=M. ursinus\n|image=File:Sloth Bear Washington DC.JPG |image-size=180px |image-alt=Black bear with gray face on rock\n|authority-name=[[George Shaw (biologist)|Shaw]] |authority-year=1791 |authority-not-original=yes\n|subspecies={{Collapsible list |expand=yes |title=Two subspecies |bullets=on\n| ''M. u. inornatus'' ([[Sri Lankan sloth bear]])\n| ''M. u. ursinus'' (Indian sloth bear)\n}}\n|range=India (current range in green, former in black) |range-image=File:Sloth Bear area.png |range-image-size=161px\n|size={{convert|150|–|180|cm|in|0|abbr=on}} long, plus {{convert|7|–|12|cm|in|0|abbr=on}} tail<br/>{{convert|54|–|141|kg|lb|0|abbr=on}}<ref name="Slothbearsize"/>\n|habitat=Shrubland, grassland, forest, and savanna<ref name="IUCNSlothbear"/>\n|hunting=Primarily eats termites and fruit<ref name="IUCNSlothbear"/>\n|iucn-status=VU |population=6,000–20,000<ref name="IUCNSlothbear"/><ref name="Slothbearpop"/>\n|direction={{decrease|Population declining}}<ref name="IUCNSlothbear"/>\n}}\n
{{Species table/end}}


- numOfBears = 4
\n{{Species table |no-note=y |genus=[[Ursus (genus)|Ursus]] |authority-name=[[Carl Linnaeus|Linnaeus]] |authority-year=1758 |species-count=four}}\n

{{Species table/row\n|name=[[American black bear]] |binomial=U. americanus\n|image=File:01 Schwarzbär.jpg |image-size=132px |image-alt=Black bear in grass\n|authority-name=[[Peter Simon Pallas|Pallas]] |authority-year=1780\n|subspecies={{Collapsible list |expand= |title=Sixteen subspecies |bullets=on\n| ''U. a. altifrontalis'' (Olympic black bear)\n| ''U. a. amblyceps'' (New Mexico black bear)\n| ''U. a. americanus'' (Eastern black bear)\n| ''U. a. californiensis'' (California black bear)\n| ''[[Ursus americanus carlottae|U. a. carlottae]]'' (Haida Gwaii black bear)\n| ''U. a. cinnamomum'' ([[Cinnamon bear]])\n| ''U. a. emmonsii'' ([[Glacier bear]])\n| ''U. a. eremicus'' (East Mexican black bear)\n| ''U. a. floridanus'' ([[Florida black bear]])\n| ''U. a. hamiltoni'' ([[Newfoundland black bear]])\n| ''U. a. kermodei'' ([[Kermode bear]])\n| ''U. a. luteolus'' ([[Louisiana black bear]])\n| ''U. a. machetes'' (West Mexican black bear)\n| ''U. a. perniger'' (Kenai black bear)\n| ''U. a. pugnax'' (Dall Island black bear)\n| ''U. a. vancouveri'' (Vancouver Island black bear)\n}}\n|range=North America (current range in red, former in pink) |range-image=File:Ursus americanus IUCN range map extant and extirpated.png |range-image-size=180px\n|size={{convert|120|–|200|cm|in|0|abbr=on}} long, plus {{convert|8|–|14|cm|in|0|abbr=on}} tail<br/>{{convert|39|–|409|kg|lb|0|abbr=on}}<ref name="ADWAmericanblackbear"/>\n|habitat=Forest, inland wetlands, grassland, shrubland, and desert<ref name="IUCNAmericanblackbear"/>\n|hunting=Omnivorous; eats vegetation, roots, buds, fruit, nuts, insects, fish, mammals, and carrion<ref name="IUCNAmericanblackbear"/>\n|iucn-status=LC |population=735,000–941,000<ref name="Americanblackbearpop"/>\n|direction={{increase|Population increasing}}<ref name="IUCNAmericanblackbear"/>\n}}\n

{{Species table/row\n|name=[[Asian black bear]] |binomial=U. thibetanus\n|image=File:Ursus thibetanus 3 (Wroclaw zoo).JPG |image-size=135px |image-alt=Black bear with white chest marking on grass\n|authority-name=[[Georges Cuvier|Cuvier]] |authority-year=1823\n|subspecies={{Collapsible list |expand= |title=Seven subspecies |bullets=on\n| ''U. t. formosanus'' ([[Formosan black bear]])\n| ''U. t. gedrosianus'' ([[Balochistan black bear]])\n| ''U. t. japonicus'' ([[Japanese black bear]])\n| ''U. t. laniger'' ([[Himalayan black bear]])\n| ''U. t. mupinensis'' (Indochinese black bear)\n| ''U. t. thibetanus'' (Tibetan black bear)\n| ''U. t. ussuricus'' ([[Ussuri black bear]])\n}}\n|range=South and East Asia (current range in brown, former in black) |range-image=File:Asian Black Bear area.png |range-image-size=180px\n|size={{convert|120|–|180|cm|in|0|abbr=on}} long, plus {{convert|6|–|11|cm|in|0|abbr=on}} tail<br/>{{convert|65|–|150|kg|lb|0|abbr=on}}<ref name="ADWAsianblackbear"/>\n|habitat=Forest, inland wetlands, grassland, and shrubland<ref name="IUCNAsianblackbear"/>\n|hunting=Eats vegetation, insects, fruit, nuts, [[ungulate]]s, and livestock<ref name="IUCNAsianblackbear"/>\n|iucn-status=VU |population=50,000<ref name="Bearpop"/>\n|direction={{decrease|Population declining}}<ref name="IUCNAsianblackbear"/>\n}}\n

{{Species table/row\n|name=[[Brown bear]] |binomial=U. arctos\n|image=File:Kamchatka Brown Bear near Dvuhyurtochnoe on 2015-07-23.jpg |image-size=180px |image-alt=Brown bear in river\n|authority-name=[[Carl Linnaeus|Linnaeus]] |authority-year=1758\n|subspecies={{Collapsible list |expand= |title=Sixteen subspecies |bullets=on\n| ''U. a. alascensis'' (Alaskan grizzly bear)\n| ''U. a. arctos'' ([[Eurasian brown bear]])\n| ''U. a. beringianus'' ([[Kamchatka brown bear]])\n| ''U. a. californicus'' ([[California grizzly bear]])\n| ''U. a. collaris'' ([[East Siberian brown bear]])\n| ''U. a. crowtheri'' ([[Atlas bear]]){{dagger|alt=Extinct}}\n| ''U. a. dalli'' (Dall Island brown bear)\n| ''U. a. gyas'' ([[Alaska Peninsula brown bear]])\n| ''U. a. horribilis'' ([[Grizzly bear]])\n| ''U. a. isabellinus'' ([[Himalayan brown bear]])\n| ''U. a. lasiotus'' ([[Ussuri brown bear]])\n| ''U. a. middendorffi'' ([[Kodiak bear]])\n| ''U. a. pruinosus'' ([[Tibetan blue bear]])\n| ''U. a. sitkensis'' ([[ABC Islands bear]])\n| ''U. a. stikeenensis'' ([[Stickeen brown bear]])\n| ''U. a. syriacus'' ([[Syrian brown bear]])\n}}\n|range=Northern North America and Europe, and northern and central Asia |range-image=File:Ursus arctos range map.svg |range-image-size=180px\n|size={{convert|100|–|280|cm|in|0|abbr=on}} long, plus {{convert|6|–|20|cm|in|0|abbr=on}} tail<br/>{{convert|80|–|550|kg|lb|0|abbr=on}}<ref name="Brownbearsize"/>\n|habitat=Desert, forest, inland wetlands, grassland, and shrubland<ref name="IUCNBrownbear"/>\n|hunting=Omnivorous; eats grasses, herbs, roots, berries, nuts, insects, mammals, and fish<ref name="IUCNBrownbear"/>\n|iucn-status=LC |population=110,000\n|direction={{steady|Population steady}}<ref name="IUCNBrownbear"/>\n}}\n

{{Species table/row\n|name=[[Polar bear]] |binomial=U. maritimus\n|image=File:Polar Bear - Alaska (cropped).jpg |image-size=179px |image-alt=White bear on snow\n|authority-name=[[Constantine Phipps, 2nd Baron Mulgrave|Mulgrave]] |authority-year=1774\n|range=Polar North America and Asia |range-image=File:Polar bear range map.png |range-image-size=180px\n|size={{convert|220|–|244|cm|in|0|abbr=on}} long, plus {{convert|7|–|13|cm|in|0|abbr=on}} tail<br/>{{convert|408|–|726|kg|lb|-1|abbr=on}}<ref name="Polarbearsize"/>\n|habitat=[[Oceanic zone|Oceanic marine]], shrubland, forest, grassland, [[supralittoral zone|coastal marine]], and [[intertidal zone|intertidal marine]]<ref name="IUCNPolarbear"/>\n|hunting=Primarily eats seals, as well as walruses, [[beluga whale]]s, birds, fish, vegetation and [[kelp]]<ref name="IUCNPolarbear"/>\n|iucn-status=VU |population=23,000<ref name="Polarbearpop"/>\n|direction={{population change unknown}}<ref name="IUCNPolarbear"/>\n}}\n
{{Species table/end}}
```