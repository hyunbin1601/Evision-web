package webpage.spring.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import webpage.spring.DTO.AttendanceReponseDTO;
import webpage.spring.DTO.AttendanceRequestDTO;
import webpage.spring.DTO.MemberInfoDTO;
import webpage.spring.domain.Session;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class Response_attendance implements Response{

    private boolean success;
    private List<AttendanceReponseDTO> member_attendance;

}
