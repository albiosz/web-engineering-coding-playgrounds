var baseUrl = "https://en.wikipedia.org/w/api.php";

export function fetchBearData() {

    var title = "List_of_ursids";

    var params = {
        action: "parse",
        page: title,
        prop: "wikitext",
        section: 3,
        format: "json",
        origin: "*"
    };

    fetch(baseUrl + "?" + new URLSearchParams(params).toString())
        .then(function(res) { return res.json(); })
        .then(function(data) {
            extractBears(data.parse.wikitext['*']);
        });
}

function extractBears(wikitext) {
    var speciesTables = wikitext.split('{{Species table/end}}');
    var bearPromises = [];

    speciesTables.forEach(function(table) {
        var rows = table.split('{{Species table/row');
        rows.forEach(function(row) {
            var nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
            var binomialMatch = row.match(/\|binomial=(.*?)\n/);
            var imageMatch = row.match(/\|image=(.*?)\n/);

            if (nameMatch && binomialMatch && imageMatch) {
                var fileName = imageMatch[1].trim().replace('File:', '');

                bearPromises.push(createBearData(nameMatch[1], binomialMatch[1], fileName));

            }
        });
    });

    Promise.all(bearPromises).then(function(bears) {
        console.log(bears);
        renderBears(bears);
    });
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

async function createBearData(name, binomial, fileName) {
    try {
        const imageUrl = await fetchImageUrl(fileName);
        return {
            name: name,
            binomial: binomial,
            image: imageUrl,
            range: "TODO extract correct range"
        };
    } catch (error) {
        console.error(`Error fetching image for ${name}:`, error);
        // Fallback-Bild oder leere URL
        return {
            name: name,
            binomial: binomial,
            image: '',
            range: "TODO extract correct range"
        };
    }
}

function fetchImageUrl(fileName) {
    var imageParams = {
        action: "query",
        titles: "File:" + fileName,
        prop: "imageinfo",
        iiprop: "url",
        format: "json",
        origin: "*"
    };

    var url = baseUrl + "?" + new URLSearchParams(imageParams).toString();
    return fetch(url).then(function(res) {
        return res.json();
    }).then(function(data) {
        var pages = data.query.pages;
        var page = Object.values(pages)[0];
        return page.imageinfo[0].url;
    });
}
