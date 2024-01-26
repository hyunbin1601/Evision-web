package evisionweb.repository;

import evision.evisionweb.domain.Member;
import evision.evisionweb.domain.Session;

public interface SessionRepository {
    Session AttendanceCheck(Member member, Session session, Boolean attendance);
    Session AssignmentCheck(Member member, Session session, Boolean attendance);
    Integer getFine();
}
