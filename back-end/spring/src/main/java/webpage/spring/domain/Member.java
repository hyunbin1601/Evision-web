package webpage.spring.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class Member { //이게 SiteUser인거 기억하기!!!!

    @Id
    private Long id;

    private String name;

    private String password;

    private String major;

    private String email;

    private String student_type;

    private boolean admin;

    private int fine;

    private int totalSettlement;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<AttendanceMember> attendanceMemberList;
}