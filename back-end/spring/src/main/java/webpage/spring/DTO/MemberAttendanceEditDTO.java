package webpage.spring.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberAttendanceEditDTO {
    private String id;
    private String date;
    private String attendance_status;
}
