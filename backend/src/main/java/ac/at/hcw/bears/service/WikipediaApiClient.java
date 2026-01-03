package ac.at.hcw.bears.service;

import ac.at.hcw.bears.dto.BearDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
@Slf4j
public class WikipediaApiClient {

    private static final String BASE_URL = "https://en.wikipedia.org/w/api.php";
    private static final String PLACEHOLDER_IMAGE = "media/placeholder.svg";
    
    private final RestTemplate restTemplate;

    public List<BearDto> fetchBearData() {
        String wikitext = fetchWikitext();
        return extractBears(wikitext);
    }

    @SuppressWarnings("unchecked")
    private String fetchWikitext() {
        String url = UriComponentsBuilder.fromUriString(BASE_URL)
                .queryParam("action", "parse")
                .queryParam("page", "List_of_ursids")
                .queryParam("prop", "wikitext")
                .queryParam("section", "3")
                .queryParam("format", "json")
                .queryParam("origin", "*")
                .toUriString();

        try {
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            Map<String, Object> parse = (Map<String, Object>) response.get("parse");
            Map<String, Object> wikitext = (Map<String, Object>) parse.get("wikitext");
            return (String) wikitext.get("*");
        } catch (Exception e) {
            log.error("Error fetching bear data from Wikipedia", e);
            return "";
        }
    }

    private List<BearDto> extractBears(String wikitext) {
        String[] speciesTables = wikitext.split("\\{\\{Species table/end}}");

        List<BearDto> bears = new ArrayList<>();
        Pattern namePattern = Pattern.compile("\\|name=\\[\\[(.+?)]]");
        Pattern binomialPattern = Pattern.compile("\\|binomial=(.+?)\\n");
        Pattern imagePattern = Pattern.compile("\\|image=(.+?)\\n");
        Pattern rangePattern = Pattern.compile("\\|range=([^|]+).*?\\n");

        for (String table : speciesTables) {
            String[] rows = table.split("\\{\\{Species table/row");
            
            for (String row : rows) {
                Matcher nameMatcher = namePattern.matcher(row);
                Matcher binomialMatcher = binomialPattern.matcher(row);
                Matcher imageMatcher = imagePattern.matcher(row);
                Matcher rangeMatcher = rangePattern.matcher(row);

                if (nameMatcher.find() && binomialMatcher.find() && 
                    imageMatcher.find() && rangeMatcher.find()) {
                    
                    String name = nameMatcher.group(1);
                    String binomial = binomialMatcher.group(1);
                    String imageRaw = imageMatcher.group(1).trim();
                    
                    // Extract just the filename, removing any additional parameters
                    String fileName = extractFileName(imageRaw);
                    String range = rangeMatcher.group(1);

                    bears.add(createBearDto(name, binomial, fileName, range));
                }
            }
        }

        return bears;
    }

    private String extractFileName(String imageRaw) {
        log.debug("Raw image value: {}", imageRaw);
        
        // Remove "File:" prefix if present
        String fileName = imageRaw.replace("File:", "");
        
        // Split by pipe to remove parameters like |image-size=180px
        if (fileName.contains("|")) {
            fileName = fileName.substring(0, fileName.indexOf("|"));
        }
        
        fileName = fileName.trim();
        log.debug("Extracted filename: {}", fileName);
        return fileName;
    }

    private BearDto createBearDto(String name, String binomial, 
                                   String fileName, String range) {
        String imageUrl = PLACEHOLDER_IMAGE;
        try {
            imageUrl = fetchImageUrl(fileName);
        } catch (Exception e) {
            log.error("Error fetching image for {}", name, e);
        }

        return new BearDto(name, binomial, imageUrl, range);
    }

    @SuppressWarnings("unchecked")
    private String fetchImageUrl(String fileName) {
        log.debug("Fetching image URL for filename: {}", fileName);
        
        try {
            String url = BASE_URL + "?action=query&titles=File:" + fileName +
                         "&prop=imageinfo&iiprop=url&format=json&origin=*";
            
            log.debug("Request URL: {}", url);
            
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            log.debug("API Response for {}: {}", fileName, response);
            
            if (response == null || !response.containsKey("query")) {
                log.warn("Invalid response structure for filename: {}", fileName);
                return PLACEHOLDER_IMAGE;
            }
            
            Map<String, Object> query = (Map<String, Object>) response.get("query");
            Map<String, Object> pages = (Map<String, Object>) query.get("pages");
            Map<String, Object> page = (Map<String, Object>) pages.values().iterator().next();
            
            log.debug("Page data for {}: {}", fileName, page);
            
            List<Map<String, Object>> imageinfo = (List<Map<String, Object>>) page.get("imageinfo");
            
            if (imageinfo != null && !imageinfo.isEmpty()) {
                String imageUrl = (String) imageinfo.getFirst().get("url");
                log.debug("Successfully fetched image URL: {}", imageUrl);
                return imageUrl;
            }
            log.warn("No imageinfo found for filename: {}. Page keys: {}", fileName, page.keySet());
            return PLACEHOLDER_IMAGE;
        } catch (Exception e) {
            log.error("Error fetching image URL for {}", fileName, e);
            return PLACEHOLDER_IMAGE;
        }
    }
}

