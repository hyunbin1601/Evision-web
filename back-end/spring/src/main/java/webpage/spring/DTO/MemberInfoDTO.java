package webpage.spring.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberInfoDTO {
    private String name;
    private String id;
    private String student_type;
    private String major;
    private String email;
}
