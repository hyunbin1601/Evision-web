package webpage.spring.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private int num;

    private String id;
    private LocalDate todayDate;
    private String session_type;

    @Enumerated(EnumType.STRING)
    private MemberAttendance attendance_status;
    private Boolean assignment;

    @JsonIgnore
    private String regular_session_assignment_link;
    @JsonIgnore
    private String weekend_session_assignment_link;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    private Member member;

}