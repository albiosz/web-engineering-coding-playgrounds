package ac.at.hcw.bears.controller;

import ac.at.hcw.bears.dto.BearDto;
import ac.at.hcw.bears.service.BearService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class BearController {

    private final BearService bearService;

    @GetMapping("/bears")
    public ResponseEntity<List<BearDto>> getAllBears() {
        log.info("GET /api/bears request received");
        List<BearDto> bears = bearService.getAllBears();
        return ResponseEntity.ok(bears);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        log.error("Error processing request", e);
        return ResponseEntity.internalServerError()
                .body("Error fetching bear data: " + e.getMessage());
    }
}

