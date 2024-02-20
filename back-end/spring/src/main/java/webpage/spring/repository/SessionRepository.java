package webpage.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import webpage.spring.domain.Member;
import webpage.spring.domain.MemberAttendance;
import webpage.spring.domain.Session;

import java.util.List;

public interface SessionRepository extends JpaRepository<Session, String> {
//    Session AssignmentCheck(Member member, Session session, Boolean assignment);
//    Integer getFine();

}
