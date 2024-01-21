package evision.evisionweb.repository;

import evision.evisionweb.domain.Session;
import evision.evisionweb.domain.Member;

import java.util.List;

public interface SessionRepository {
    Session AttendanceCheck(Member member, Session session, Boolean attendance);
    Session AssignmentCheck(Member member, Session session, Boolean attendance);
    Integer getFine();
}
