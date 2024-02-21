package webpage.spring.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AttendanceReponseDTO {

    private String id;
    private String name;
    private String session_type;
    private String attendance_status;
    private String todayDate;

}
