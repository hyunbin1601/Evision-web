package webpage.spring.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
public class AttendanceMember {
    // Member db와 연결할 또다른 db AttendanceUser
    //출결 관리
    @Id
    private Long id;
    private LocalDate todayDate;
    private MemberAttendance attendance_status;

    @JsonIgnore
    private String session;

    @ManyToOne
    @JsonIgnore
    private Member member; //AttendanceUser가 many, member가 1

}
