package webpage.spring.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import webpage.spring.DTO.MemberInfoDTO;
import webpage.spring.domain.AttendanceMember;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class Response_s_in_l implements Response{

    private boolean success;

    private MemberInfoDTO user_info;

    private List<AttendanceMember> attendance_status;
}
