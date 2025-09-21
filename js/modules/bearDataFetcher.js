var baseUrl = "https://en.wikipedia.org/w/api.php";

export async function fetchBearData() {

    var title = "List_of_ursids";

    var params = {
        action: "parse",
        page: title,
        prop: "wikitext",
        section: 3,
        format: "json",
        origin: "*"
    };

    let response = null;
    try {
        response = await fetch(baseUrl + "?" + new URLSearchParams(params).toString());
    } catch (error) {
        console.error(`Error fetching bear data from URL: ${baseUrl}, error: ${error}`);
        return;
    }

    let data = await response.json();
    let bears = await extractBears(data.parse.wikitext['*']);
    try {
        renderBears(bears);
    } catch (error) {
        console.error(`Error rendering bears: ${error}`);
    }
}

async function extractBears(wikitext) {
    var speciesTables = wikitext.split('{{Species table/end}}');
    var bearPromises = [];

    speciesTables.forEach(function(table) {
        var rows = table.split('{{Species table/row');
        rows.forEach(function(row) {
            var nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
            var binomialMatch = row.match(/\|binomial=(.*?)\n/);
            var imageMatch = row.match(/\|image=(.*?)\n/);
            // capture just the first part of the range information (between the `|range=` and the `|`)
            // it contains also graphic for the range etc.
            var rangeMatch = row.match(/\|range=([^|]+).*?\n/);

            if (nameMatch && binomialMatch && imageMatch) {
                var fileName = imageMatch[1].trim().replace('File:', '');

                // creating a promise for each bear, since it awaits for HTTP calls to fetch the image url
                bearPromises.push(createBearData(nameMatch[1], binomialMatch[1], fileName, rangeMatch[1]));
            }
        });
    });

    // resolve the promises in parallel, so we do not wait for each bear resolved separately
    return await Promise.all(bearPromises);
}


function renderBears(bears) {
    var moreBears = document.querySelector('.more_bears');
    bears.forEach(function(bear) {
        var html = '<div class="bear">' +
            '<img src="' + bear.image + '" alt="Image of ' + bear.name + '" style="width:200px; height:auto;">' +
            '<p><b>' + bear.name + '</b> (' + bear.binomial + ')</p>' +
            '<p>Range: ' + bear.range + '</p>' +
            '</div>';
        moreBears.innerHTML += html;
    });
}

async function createBearData(name, binomial, fileName, range) {
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
        range: range
    };
}

async function fetchImageUrl(fileName) {
    var imageParams = {
        action: "query",
        titles: "File:" + fileName,
        prop: "imageinfo",
        iiprop: "url",
        format: "json",
        origin: "*"
    };

    var url = baseUrl + "?" + new URLSearchParams(imageParams).toString();
    
    let response = await fetch(url);
    let data = await response.json();
    let pages = data.query.pages;
    let page = Object.values(pages)[0];
    return page.imageinfo[0].url;
}
