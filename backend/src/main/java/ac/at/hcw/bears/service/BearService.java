package ac.at.hcw.bears.service;

import ac.at.hcw.bears.dto.BearDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BearService {

    private final WikipediaApiClient wikipediaApiClient;

    public List<BearDto> getAllBears() {
        return wikipediaApiClient.fetchBearData();
    }
}

