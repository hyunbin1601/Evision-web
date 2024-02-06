package webpage.spring.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import webpage.spring.domain.Member;
import webpage.spring.DTO.MemberInfoDTO;
import webpage.spring.repository.AttendanceRepository;
import webpage.spring.domain.AttendanceMember;
import webpage.spring.repository.MemberRepository;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final AttendanceRepository attendanceRepository;

    public MemberInfoDTO get_user_info(Member user){

        MemberInfoDTO member_info = new MemberInfoDTO();
        member_info.setId(user.getId());
        member_info.setEmail(user.getEmail());
        member_info.setMajor(user.getEmail());
        member_info.setName(user.getName());
        member_info.setStudent_type(user.getStudent_type());

        return member_info;
    }
    public List<AttendanceMember> assignment_submitted(Member member){

        List<AttendanceMember> userAttendanceList = attendanceRepository.findAllById(member.getId());
        //id에 대한 모든 출결정보 list로 가져오기

        return userAttendanceList;
    }

    public boolean login(Long enteredid, String enteredpw){
        Member member = memberRepository.findById(enteredid).get();
        if(enteredpw==member.getPassword()){
            return true;
        }
        else return false;
    }

    public boolean adminlogin(Member member, Long enteredid, String enteredpw, Boolean enteredadmin){
        Member result = memberRepository.findById(enteredid).get();
        if((enteredpw==result.getPassword())&&(enteredadmin)){
            return true;
        }
        else return false;
    }

    public enum Authority{
        ROLE_NOTMEMBER, ROLE_MEMBER, ROLE_ADMIN
    }

}
