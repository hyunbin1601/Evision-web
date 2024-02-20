package webpage.spring.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import webpage.spring.domain.Member;
import webpage.spring.DTO.MemberInfoDTO;
import webpage.spring.domain.Session;
import webpage.spring.repository.CheckRepository;
import webpage.spring.repository.MemberRepository;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CheckRepository checkRepository;

    public MemberInfoDTO get_user_info(Member user){

        MemberInfoDTO member_info = new MemberInfoDTO();
        member_info.setId(user.getId());
        member_info.setEmail(user.getEmail());
        member_info.setMajor(user.getMajor());
        member_info.setName(user.getName());
        member_info.setStudent_type(user.getStudent_type());

        return member_info;
    }
    public List<Session> assignment_submitted(Member member){

        List<Session> userAttendanceList = this.checkRepository.findAllById(member.getId());
        //id에 대한 모든 출결정보 list로 가져오기
        return userAttendanceList;
    }

    public boolean login(String enteredId, String enteredPw) {
        Optional<Member> optionalMember = this.memberRepository.findById(enteredId);
        if (optionalMember.isEmpty()) {
            System.out.println("Sorry you are not evision member.");
            return false;
        }
        Member member = optionalMember.get();
        if (passwordEncoder.matches(enteredPw, member.getPassword())) {
            return true;
        } else {
            return false;
        }
    }


//    public boolean adminlogin(Member member, String enteredid, String enteredpw, Boolean enteredadmin){
//        Member result = memberRepository.findById(enteredid).get();
//        if((enteredpw==result.getPassword())&&(enteredadmin)){
//            return true;
//        }
//        else return false;
//    }

//    public enum Authority{
//        ROLE_NOTMEMBER, ROLE_MEMBER, ROLE_ADMIN
//    }

}