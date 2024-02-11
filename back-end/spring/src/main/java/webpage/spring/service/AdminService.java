package webpage.spring.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import webpage.spring.DTO.MemberEditDTO;
import webpage.spring.domain.Member;
import webpage.spring.domain.MemberAttendance;
import webpage.spring.domain.MemberRole;
import webpage.spring.domain.Session;
import webpage.spring.repository.CheckRepository;
import webpage.spring.repository.MemberRepository;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class AdminService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CheckRepository checkRepository;
    public Member create(String id, String name, String password, String major, String email, String student_type, boolean admin){
        Member member = new Member();
        member.setId(id);
        member.setName(name);
        member.setPassword(passwordEncoder.encode(password)); //패스워드 암호화
        member.setMajor(major);
        member.setEmail(email);
        member.setStudent_type(student_type);
        member.setAdmin(admin);
        member.setFine(0); //초기 벌금 0원
        member.setTotal_settlement(30000); //초기 보증금 30000원

        member.setRole(admin ? MemberRole.ADMIN : MemberRole.USER);

        this.memberRepository.save(member);
        return member;
    }
    public List<Member> retrieveAllUser(){    //회원 조회 기능
        List<Member> allMember = this.memberRepository.findAll();
        return allMember;
    }
    public void deleteUser(String id){
        Optional<Member> optional_member = this.memberRepository.findById(id);
        Member member = optional_member.get();
        this.memberRepository.delete(member);
    }

    public void editUser(Member edit_member){
        String edit_member_id = edit_member.getId();
        Optional<Member> optional_member = this.memberRepository.findById(edit_member_id);

        Member origin_member = optional_member.get();

        if (edit_member.getName() != null) {
            origin_member.setName(edit_member.getName());
        }
        if (edit_member.getStudent_type() != null) {
            origin_member.setStudent_type(edit_member.getStudent_type());
        }
        if (edit_member.getEmail() != null) {
            origin_member.setEmail(edit_member.getEmail());
        }
        if(edit_member.getPassword()!=null){
            if (!passwordEncoder.matches(edit_member.getPassword(), origin_member.getPassword())) {
                origin_member.setPassword(passwordEncoder.encode(edit_member.getPassword()));
            }
        }
        if (edit_member.getFine() != origin_member.getFine()) {
            origin_member.setFine(edit_member.getFine());
        }
        if (edit_member.getMajor() != null) {
            origin_member.setMajor(edit_member.getMajor());
        }
        if (edit_member.getAdmin() != null) {
            // 이전 정보와 다를 경우에는 업데이트
            if (edit_member.getAdmin() != origin_member.getAdmin()) {
                origin_member.setAdmin(edit_member.getAdmin());
            }
        }
        // 원본 멤버 업데이트
        this.memberRepository.save(origin_member);
    }

    //user 한 명의 출결 상태 저장
    public boolean createAttendanceThu(Member member, MemberAttendance attendance_status, LocalDate date){
        Session attendance = new Session();
        if(!this.checkRepository.existsByMemberIdAndTodayDate(member.getId(), date)){
            //이미 id에 대한 날짜에 대한 출결이 존재한다면 로직 실행 x
            attendance.setMember(member);
            attendance.setId(member.getId());
            attendance.setTodayDate(date);
            attendance.setSession_type("thu");
            attendance.setAttendance_status(attendance_status);
            this.setFine(member.getId());
        }else{
            return false;
        }
        this.checkRepository.save(attendance);
        return true;
    }

    public boolean createAttendanceSat(Member member, MemberAttendance attendance_status, LocalDate date){
        Session attendance = new Session();
        if(!this.checkRepository.existsByMemberIdAndTodayDate(member.getId(), date)){
            //이미 id에 대한 날짜에 대한 출결이 존재한다면 로직 실행 x
            attendance.setMember(member);
            attendance.setId(member.getId());
            attendance.setTodayDate(date);
            attendance.setSession_type("sat");
            attendance.setAttendance_status(attendance_status);
            this.setFine(member.getId());
        }else{
            return false;
        }
        this.checkRepository.save(attendance);
        return true;
    }
    public List<Session> retrieveAllAttendance(){
        List<Session> allAttendance = this.checkRepository.findAll();
        return allAttendance;
    }

    public void editAttendance(MemberEditDTO editAttendance) {

        String id = editAttendance.getId();
        String todayDate = editAttendance.getTodayDate();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(todayDate, formatter);

        Session session = null;

        if (checkRepository.existsByMemberIdAndTodayDate(id, localDate)) {
            // 특정 id, 특정 날짜에 대한 데이터가 존재할 때
            session = checkRepository.findAllByIdAndTodayDate(id, localDate);
            System.out.println("id: " + session.getId());
            session.setTodayDate(localDate);
            session.setAttendance_status(MemberAttendance.valueOf(editAttendance.getAttendance_status()));
            DayOfWeek dayOfWeek = localDate.getDayOfWeek();
            if (dayOfWeek.getValue() == 4) {
                session.setSession_type("thu");
            } else if (dayOfWeek.getValue() == 6) {
                session.setSession_type("sat");
            } else {
                return;
            }
        }
        this.setFine(id);

        this.checkRepository.save(session);
    }

    public void setFine(String id){ //벌금 설정

        Member member = this.memberRepository.findById(id).get();

        List<Session> memberSessionList = member.getSessionList();

        int absence = 0;
        int late = 0;
        for (Session memberSession: memberSessionList){
            if(memberSession.getSession_type().equalsIgnoreCase("thu")){ //세션이 thu 일 때만 벌금 계산!

                MemberAttendance attendanceStatus = memberSession.getAttendance_status();

                if(attendanceStatus.equals(MemberAttendance.ABSENCE)){
                    absence++;
                }else if (attendanceStatus.equals(MemberAttendance.LATE))
                {
                    late++;
                }
            }
        }
        int lateToAbsence = (late / 3) ;
        absence += lateToAbsence;
        //과제 미제출도 연결해야대어요
        member.setFine(absence*2000);
        member.setTotal_settlement(member.getTotal_settlement() - member.getFine());
        this.memberRepository.save(member);
    }



}
