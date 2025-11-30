export { fetchBearData };

export type BearData = {
  name: string;
  binomial: string;
  image: string;
  range: string;
};

const baseUrl = 'https://en.wikipedia.org/w/api.php';

const fetchBearData = async (): Promise<BearData[]> => {
  const title = 'List_of_ursids';

  const params: Record<string, string> = {
    action: 'parse',
    page: title,
    prop: 'wikitext',
    section: '3',
    format: 'json',
    origin: '*',
  };

  let response: Response | null = null;
  try {
    response = await fetch(
      baseUrl + '?' + new URLSearchParams(params).toString()
    );
  } catch (error) {
    console.error(
      `Error fetching bear data from URL: ${baseUrl}, error: ${error}`
    );
    return [];
  }

  const data = await response.json();
  return await extractBears(data.parse.wikitext['*']);
};

const extractBears = async (wikitext: string) => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bearPromises: Promise<BearData>[] = [];

  speciesTables.forEach((table: string) => {
    const rows: string[] = table.split('{{Species table/row');
    rows.forEach((row) => {
      const nameMatch: RegExpMatchArray | null =
        row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch: RegExpMatchArray | null =
        row.match(/\|binomial=(.*?)\n/);
      const imageMatch: RegExpMatchArray | null = row.match(/\|image=(.*?)\n/);
      // capture just the first part of the range information (between the `|range=` and the `|`)
      // it contains also graphic for the range etc.
      const rangeMatch: RegExpMatchArray | null =
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

const createBearData = async (
  name: string,
  binomial: string,
  fileName: string,
  range: string
): Promise<BearData> => {
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

  const response = await fetch(url);
  const data = await response.json();
  const pages = data.query.pages;
  const page = Object.values(pages)[0] as { imageinfo: { url: string }[] }; // I assume that the page looks like this
  return page.imageinfo[0].url;
};
