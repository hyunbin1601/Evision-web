package webpage.spring.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import webpage.spring.DTO.IsOkayDto;
import webpage.spring.DTO.MemberEditAssignmentDto;
import webpage.spring.domain.Member;
import webpage.spring.DTO.MemberInfoDTO;
import webpage.spring.domain.Session;
import webpage.spring.repository.CheckRepository;
import webpage.spring.repository.MemberRepository;
import webpage.spring.repository.SessionRepository;

import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CheckRepository checkRepository;
    private final SessionRepository sessionRepository;

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


    //목토에만 날짜 체크해서 열게 하는 함수
    public boolean openPage(){
        boolean pageOpen;

        LocalDate todayDate=LocalDate.now(ZoneId.of("Asia/Seoul"));
        DayOfWeek todayOfWeek=todayDate.getDayOfWeek();

        if(todayOfWeek.getValue()==4 || todayOfWeek.getValue()==6){
            pageOpen=true;
        }else{
            pageOpen=false;
        }

        return pageOpen;
    }

    //과제 제출&수정 함수
    public void submitAssignment(MemberEditAssignmentDto assignmentStatus){
        Optional<Session> optionalTmp=this.sessionRepository.findById(assignmentStatus.getId());
        Session tmp=optionalTmp.get();
        if (tmp.getTodayDate() == assignmentStatus.getDate()) {
            tmp.setTodayDate(assignmentStatus.getDate());
            tmp.setAssignment(assignmentStatus.getAssignment());
            tmp.setAssignmentLink(assignmentStatus.getAssignmentLink());
        }
        this.sessionRepository.save(tmp);
    }

    public List<IsOkayDto> assignmentCheck(){
        // isOkay가 숙제 했는지 여부. 세션 엔티티에 멤버 id, 숙제 제출 여부를 날짜랑 기록하니 이를 이용.
        //멤버 id로 싹 검색해온 다음 이게 이번주인지 아닌지 추려내서 목인지 토인지 판별

        LocalDate thisMonday= LocalDate.parse(getThisWeekMonday(), DateTimeFormatter.ISO_DATE);//이번주 월요일
        LocalDate thisSunday= LocalDate.parse(getThisWeekSunday(), DateTimeFormatter.ISO_DATE);//이번주 일요일

        List<Member> memberList=this.memberRepository.findAll();
        List<Session> sessionList=this.sessionRepository.findAll();
        List<Session> thisWeekSession=new ArrayList<>();
        List<IsOkayDto> assignmentList=new ArrayList<>();

        //이번주 세션만 필터링해서 저장
        for(int i=0; i<sessionList.size(); i++){
            int cmp1=sessionList.get(i).getTodayDate().compareTo(thisMonday);//1이거나 0
            int cmp2=sessionList.get(i).getTodayDate().compareTo(thisSunday);//-1이거나 0

            if(cmp1>=0 && cmp2<=0){
                thisWeekSession.add(sessionList.get(i));
            }
        }

        //이번주 세션만 필터링한 리스트에서 id를 검색, 해당 멤버가 그 주에 과제 체크했는지 확인,
        for(int j=0; j<memberList.size(); j++){
            int finalJ = j;
            //2개만 찾아지는지 확인
            List<Session> tmpList=thisWeekSession.stream().filter(x->x.getId().equals(memberList.get(finalJ).getId())).collect(Collectors.toList());;

            IsOkayDto tmp=new IsOkayDto(memberList.get(j).getId());
            Optional<Session> tmpThu=tmpList.stream().filter(x->x.getTodayDate().getDayOfWeek().getValue()==4).findFirst();
            Optional<Session> tmpSat=tmpList.stream().filter(x->x.getTodayDate().getDayOfWeek().getValue()==6).findFirst();

            //그날 과제 했는지 요일 나눠서 기록
            if(tmpThu.isPresent()){
                Session thu=tmpThu.get();
                tmp.setIsOkayThu(thu.getAssignment());
            }else{
                tmp.setIsOkayThu(false);
            }

            if(tmpSat.isPresent()){
                Session sat=tmpSat.get();
                tmp.setIsOkaySat(sat.getAssignment());
            }else{
                tmp.setIsOkaySat(false);
            }

            assignmentList.add(tmp);
        }

        return assignmentList;
    }

    //이번주 월요일 구하는 함수
    public String getThisWeekMonday(){
        Calendar ca = Calendar.getInstance(TimeZone.getTimeZone("Asia/Seoul"));
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        ca.set(Calendar.DAY_OF_WEEK, 2);//calendar에서 2가 월요일 장난하냐?
        String mon=sdf.format(ca.getTime());

        return mon;
    }

    //이번주 일요일 구하는 함수
    public String getThisWeekSunday(){
        Calendar ca = Calendar.getInstance(TimeZone.getTimeZone("Asia/Seoul"));
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        ca.set(Calendar.DAY_OF_WEEK, 1);
        String sun=sdf.format(ca.getTime());

        return sun;
    }
}