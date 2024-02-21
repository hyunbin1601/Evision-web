package webpage.spring.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AssignmentResponseDTO {
    private String id;
    private String name;
    private String session_type;
    private boolean assignment_status;
    private String todayDate;

}
