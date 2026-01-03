package ac.at.hcw.bears.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BearDto {
    private String name;
    private String binomial;
    private String image;
    private String range;
}

