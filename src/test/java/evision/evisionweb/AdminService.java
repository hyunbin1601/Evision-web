package evision.evisionweb.service;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import evision.evisionweb.domain.Member;
import evision.evisionweb.domain.Session;
import evision.evisionweb.repository.MemberRepository;
import evision.evisionweb.repository.MemberRepositoryImpl;
import evision.evisionweb.repository.SessionRepository;
import evision.evisionweb.repository.SessionRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Optional;


public class AdminService {

    Member member = new Member();
    Session session = new Session();
    MemberRepository memberRepository = new MemberRepositoryImpl();
    SessionRepository sessionRepository = new SessionRepositoryImpl();

    @Autowired
    public void setMemberRepository(MemberRepository memberRepository){
        this.memberRepository = new MemberRepositoryImpl();
    }
    public Member addMember(String name, Long id, String pw, String major, String email, String type, boolean admin){
        member.setName(name);
        member.setId(id);
        member.setPw(pw);
        member.setMajor(major);
        member.setEmail(email);
        member.setType(type);
        member.setAdmin(admin);

        Object[] createMemberParams = new Object[]{member.getName(), member.getId(), member.getPw(), member.getMajor(), member.getEmail(), member.getType(), member.isAdmin()};
        this.memberRepository.save(member, id, pw);
        return member;

    }

    public Member modifyMember(String name, Long id, String pw, String major, String email, String type, boolean admin){
        member.setName(name);
        member.setId(id);
        member.setPw(pw);
        member.setMajor(major);
        member.setEmail(email);
        member.setType(type);
        member.setAdmin(admin);

        memberRepository.save(member, member.getId(), member.getPw());
        return member;
    }

    public Session check(String type, Integer date, Member member, Boolean check){
        session.setSessiontype(type);
        session.setDate(date);
        sessionRepository.AttendanceCheck(member, session, check);
        sessionRepository.AssignmentCheck(member, session, check);
        return session;
    }

   Integer viewFine(int finalfine) {
       if (sessionRepository.getFine() != 0) {
           finalfine += sessionRepository.getFine();
       }

       return finalfine;
   }
}
