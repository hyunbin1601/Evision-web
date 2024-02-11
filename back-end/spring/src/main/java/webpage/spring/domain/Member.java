package webpage.spring.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class Member{

    @Id
    private String id;

    private String name;

    private String password;

    private String major;

    private String email;

    private String student_type;

    private Boolean admin;

    private int fine;

    private int total_settlement;

    @JsonIgnore
    @Enumerated(EnumType.STRING)
    private MemberRole role;



    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Session> sessionList;


}