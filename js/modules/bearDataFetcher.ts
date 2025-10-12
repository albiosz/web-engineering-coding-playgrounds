export { fetchBearData };

const baseUrl = 'https://en.wikipedia.org/w/api.php';

const fetchBearData = async () => {
  const title = 'List_of_ursids';

  const params: Record<string, string> = {
    action: 'parse',
    page: title,
    prop: 'wikitext',
    section: '3',
    format: 'json',
    origin: '*',
  };

  let response = null;
  try {
    response = await fetch(
      baseUrl + '?' + new URLSearchParams(params).toString()
    );
  } catch (error) {
    console.error(
      `Error fetching bear data from URL: ${baseUrl}, error: ${error}`
    );
    return;
  }

  let data = await response.json();
  let bears = await extractBears(data.parse.wikitext['*']);
  try {
    renderBears(bears);
  } catch (error) {
    console.error(`Error rendering bears: ${error}`);
  }
};

const extractBears = async (wikitext: string) => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bearPromises: Promise<any>[] = [];

  speciesTables.forEach((table: string) => {
    let rows: string[] = table.split('{{Species table/row');
    rows.forEach((row) => {
      let nameMatch: RegExpMatchArray | null =
        row.match(/\|name=\[\[(.*?)\]\]/);
      let binomialMatch: RegExpMatchArray | null =
        row.match(/\|binomial=(.*?)\n/);
      let imageMatch: RegExpMatchArray | null = row.match(/\|image=(.*?)\n/);
      // capture just the first part of the range information (between the `|range=` and the `|`)
      // it contains also graphic for the range etc.
      let rangeMatch: RegExpMatchArray | null =
        row.match(/\|range=([^|]+).*?\n/);

      if (nameMatch && binomialMatch && imageMatch && rangeMatch) {
        const fileName = imageMatch[1].trim().replace('File:', '');

        // creating a promise for each bear, since it awaits for HTTP calls to fetch the image url
        bearPromises.push(
          createBearData(
            nameMatch[1],
            binomialMatch[1],
            fileName,
            rangeMatch[1]
          )
        );
      }
    });
  });

  // resolve the promises in parallel, so we do not wait for each bear resolved separately
  return await Promise.all(bearPromises);
};

const renderBears = (bears: Bear[]) => {
  const moreBears = document.querySelector('.more_bears');

  if (!moreBears) {
    console.error(
      'It was not possible to show the "More bears" section, the .more_bears element not found!'
    );
    return;
  }

  bears.forEach((bear) => {
    var html =
      '<div class="bear">' +
      '<img src="' +
      bear.image +
      '" alt="Image of ' +
      bear.name +
      '" style="width:200px; height:auto;">' +
      '<p><b>' +
      bear.name +
      '</b> (' +
      bear.binomial +
      ')</p>' +
      '<p>Range: ' +
      bear.range +
      '</p>' +
      '</div>';
    moreBears.innerHTML += html;
  });
};

const createBearData = async (
  name: string,
  binomial: string,
  fileName: string,
  range: string
): Promise<Bear> => {
  let imageUrl = 'media/placeholder.svg';
  try {
    imageUrl = await fetchImageUrl(fileName);
  } catch (error) {
    console.error(`Error fetching image for ${name}, error: ${error}`);
  }

  return {
    name: name,
    binomial: binomial,
    image: imageUrl,
    range: range,
  };
};

const fetchImageUrl = async (fileName: string) => {
  const imageParams: Record<string, string> = {
    action: 'query',
    titles: 'File:' + fileName,
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json',
    origin: '*',
  };

  const url = baseUrl + '?' + new URLSearchParams(imageParams).toString();

  let response = await fetch(url);
  let data = await response.json();
  let pages = data.query.pages;
  let page = Object.values(pages)[0] as { imageinfo: { url: string }[] }; // I assume that the page looks like this
  return page.imageinfo[0].url;
};

type Bear = {
  name: string;
  binomial: string;
  image: string;
  range: string;
};
