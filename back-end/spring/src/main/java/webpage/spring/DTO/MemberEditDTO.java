package webpage.spring.DTO;

import lombok.Getter;
import lombok.Setter;
import webpage.spring.domain.MemberAttendance;

import java.time.LocalDate;

@Getter
@Setter
public class MemberEditDTO {
    private String id;
    private String todayDate;
    private String attendance_status;
}
