package evision.evisionweb.repository;

import evision.evisionweb.domain.Member;
import evision.evisionweb.domain.Session;

import java.util.ArrayList;
import java.util.List;

public class SessionRepositoryImpl implements SessionRepository {

    List<Session> memberCheck = new ArrayList<>();
    List<Integer> penalty = new ArrayList<>();
    Integer fine;
    @Override
    public Session AttendanceCheck(Member member, Session session, Boolean attendance) {
        if ((session.getSessiontype()).equalsIgnoreCase("Regular")&&(attendance == false)) {
            session.setAttendance(false);
            memberCheck.add(session);
            penalty.add(fine);
        }
        else if ((session.getSessiontype()).equalsIgnoreCase("Weekend")&&(attendance == false)) {
            session.setAttendance(false);
            memberCheck.add(session);
        }
        else if(!session.getSessiontype().isEmpty()){
            session.setAttendance(true);
            memberCheck.add(session);
        }

        return session;
    }

    @Override
    public Session AssignmentCheck(Member member, Session session, Boolean assignment) {
        if ((session.getSessiontype()).equalsIgnoreCase("Regular")&&(assignment == true)) {
            session.setAttendance(true);
            memberCheck.add(session);
            penalty.add(fine);
        }
        else if ((session.getSessiontype()).equalsIgnoreCase("Weekend")&&(assignment == true)) {
            session.setAttendance(true);
            memberCheck.add(session);
        }
        else if(!session.getSessiontype().isEmpty()){
            session.setAttendance(false);
            memberCheck.add(session);
        }

        return session;
    }

    @Override
    public Integer getFine() {
        Integer sum=0;
        for(int i:penalty) sum += fine;
        return sum;
    }
}
