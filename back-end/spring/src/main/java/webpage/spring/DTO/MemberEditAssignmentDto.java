package webpage.spring.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class MemberEditAssignmentDto {
    private String id;
    private LocalDate date;
    private Boolean assignment;
    private String assignmentLink;
}
