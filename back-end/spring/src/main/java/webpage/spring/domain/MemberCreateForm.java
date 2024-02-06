package webpage.spring.domain;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberCreateForm {

    @NotNull(message = "사용자 ID는 필수 항목입니다.")
    private Long id;

    @NotEmpty(message = "사용자 이름은 필수 항목입니다.")
    private String name;

    @NotEmpty(message = "비밀번호는 필수 항목입니다.")
    private String password;

    @NotEmpty(message = "전공은 필수 항목입니다.")
    private String major;

    @NotEmpty(message = "이메일은 필수 항목입니다.")
    private String email;

    @NotEmpty(message = "ob/yb 선택은 필수 항목입니다.")
    private String student_type;

    @NotNull(message = "관리자 여부는 필수 항목입니다.")
    private Boolean admin;

}
