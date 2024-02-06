package webpage.spring.DTO;

import lombok.Getter;
import lombok.Setter;
import webpage.spring.domain.MemberAttendance;

import java.time.LocalDate;

@Getter
@Setter
public class MemberEditDTO {
    private Long id;
    private LocalDate date;
    private MemberAttendance attendance_status;
}
