package webpage.spring.repository;


import lombok.RequiredArgsConstructor;
import webpage.spring.domain.Member;
import webpage.spring.domain.MemberAttendance;
import webpage.spring.domain.Session;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class SessionRepositoryImpl implements SessionRepository {
    List<Session> memberCheck = new ArrayList<>();
    List<Integer> penalty = new ArrayList<>();
    Integer fine;

    private final MemberRepository memberRepository;

//    @Override
//    public Session AttendanceCheck(Member member, Session session, MemberAttendance attendance) {
//        if (attendance == MemberAttendance.ABSENCE) { //결석이면
//            session.setAttendance(MemberAttendance.ABSENCE); //session에 attendance를 결석으로 저장
//            memberCheck.add(session);
//            penalty.add(fine);
//        }
//        else if ((session.getSession_type()).equalsIgnoreCase("Weekend")&&(attendance == MemberAttendance.LATE)) {
//            session.setAttendance(MemberAttendance.LATE);
//            memberCheck.add(session);
//        }
//        else if(!session.getSession_type().isEmpty()){
//            session.setAttendance(true);
//            memberCheck.add(session);
//        }
//
//        return session;
//    }

    @Override
    public Session AssignmentCheck(Member member, Session session, Boolean assignment) {
        if ((session.getSession_type()).equalsIgnoreCase("Regular")&&(assignment == true)) {
            session.setAssignment(true);
            memberCheck.add(session);
            penalty.add(fine);
        }
        else if ((session.getSession_type()).equalsIgnoreCase("Weekend")&&(assignment == true)) {
            session.setAssignment(true);
            memberCheck.add(session);
        }
        else if(!session.getSession_type().isEmpty()){
            session.setAssignment(false);
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

