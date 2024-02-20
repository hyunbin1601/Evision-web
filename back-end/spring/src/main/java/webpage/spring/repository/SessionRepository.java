package webpage.spring.repository;

import webpage.spring.domain.Member;
import webpage.spring.domain.MemberAttendance;
import webpage.spring.domain.Session;

import java.util.List;

public interface SessionRepository {
    Session AssignmentCheck(Member member, Session session, Boolean assignment);
    Integer getFine();

}
