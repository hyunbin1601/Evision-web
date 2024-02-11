package webpage.spring.DTO;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttendanceRequestDTO {
    private String id;
    private String attendance_status;
    private String todayDate;
}
