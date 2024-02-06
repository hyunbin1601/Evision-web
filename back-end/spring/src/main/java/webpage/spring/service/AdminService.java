package webpage.spring.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import webpage.spring.DTO.MemberEditDTO;
import webpage.spring.domain.AttendanceMember;
import webpage.spring.domain.Member;
import webpage.spring.domain.MemberAttendance;
import webpage.spring.repository.AttendanceRepository;
import webpage.spring.repository.MemberRepository;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AdminService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final AttendanceRepository attendanceRepository;

    public Member create(Long id, String password, String major, String email, String student_type, boolean admin){
        Member member = new Member();
        member.setId(id);
        member.setPassword(passwordEncoder.encode(password)); //패스워드 암호화
        member.setMajor(major);
        member.setEmail(email);
        member.setStudent_type(student_type);
        member.setAdmin(admin);
        member.setFine(0); //초기 벌금 0원
        member.setTotalSettlement(30000); //초기 보증금 30000원

        this.memberRepository.save(member);
        return member;
    }
    public List<Member> retrieveAllUser(){    //회원 조회 기능
        List<Member> allMember = this.memberRepository.findAll();
        return allMember;
    }
    public void deleteUser(Long id){
        Optional<Member> optional_member = this.memberRepository.findById(id);
        Member member = optional_member.get();
        this.memberRepository.delete(member);
    }

    public void editUser(Member edit_member){
        Long edit_member_id = edit_member.getId();
        Optional<Member> optional_member = this.memberRepository.findById(edit_member_id);
        Member origin_member = optional_member.get();

        origin_member.setName(edit_member.getName());
        origin_member.setStudent_type(edit_member.getStudent_type());
        origin_member.setEmail(edit_member.getEmail());
        origin_member.setPassword(edit_member.getPassword());
        origin_member.setFine(edit_member.getFine());
        origin_member.setMajor(edit_member.getMajor());
        origin_member.setAdmin(edit_member.isAdmin());
        this.memberRepository.save(origin_member);
    }

    //user 한 명의 출결 상태 저장
    public AttendanceMember createAttendance(Member member, MemberAttendance attendance_status){

        LocalDate todayDate = LocalDate.now();
        DayOfWeek dayOfWeek = todayDate.getDayOfWeek(); //날짜 가져오기

        String session = "";

        if (dayOfWeek == DayOfWeek.THURSDAY) {
            session = "thu";
        } else if (dayOfWeek == DayOfWeek.SATURDAY) {
            session = "sun";
        } else {
            System.out.println("목 토 둘다 아님");
        }
        AttendanceMember attendance = new AttendanceMember();
        attendance.setMember(member);
        attendance.setId(member.getId());
        attendance.setTodayDate(todayDate);
        attendance.setSession(session);
        attendance.setAttendance_status(attendance_status);

        this.attendanceRepository.save(attendance);
        return attendance;
    }
    public List<AttendanceMember> retrieveAllAttendance(){
        List<AttendanceMember> allAttendance = this.attendanceRepository.findAll();
        return allAttendance;
    }

    public void editAttendance(MemberEditDTO editAttendance){
        Optional<AttendanceMember> editMember = this.attendanceRepository.findById(editAttendance.getId());
        AttendanceMember attendanceMember = editMember.get();
        if (attendanceMember.getTodayDate() == editAttendance.getDate()) {
            attendanceMember.setAttendance_status(editAttendance.getAttendance_status());
            attendanceMember.setTodayDate(editAttendance.getDate());
        }
        this.attendanceRepository.save(attendanceMember);
    }

}
