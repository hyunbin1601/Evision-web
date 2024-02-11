package webpage.spring.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import webpage.spring.DTO.AttendanceReponseDTO;
import webpage.spring.DTO.AttendanceRequestDTO;
import webpage.spring.DTO.MemberEditDTO;
import webpage.spring.domain.MemberAttendance;
import webpage.spring.domain.Session;
import webpage.spring.jwt.JwtTokenProvider;
import webpage.spring.repository.CheckRepository;
import webpage.spring.repository.MemberRepository;
import webpage.spring.response.Response;
import webpage.spring.domain.Member;
import webpage.spring.domain.MemberCreateForm;
import webpage.spring.response.Response_attendance;
import webpage.spring.response.Response_s_l;
import webpage.spring.response.Response_s_m;
import webpage.spring.service.AdminService;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

//@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Controller

public class AdminController {

    private final AdminService adminService;
    private final MemberRepository memberRepository;
    private final CheckRepository checkRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public String headerJWTCheck(HttpServletRequest request) {
        String authentication = request.getHeader("Authorization");

        boolean success = jwtTokenProvider.validateToken(authentication);
        if(success){
            Authentication auth = jwtTokenProvider.getAuthentication(authentication);

            Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();

            boolean isAdmin = authorities.stream()
                    .map(GrantedAuthority::getAuthority)
                    .anyMatch(authority -> authority.equals("ROLE_ADMIN"));

            boolean isUser = authorities.stream()
                    .map(GrantedAuthority::getAuthority)
                    .anyMatch(authority -> authority.equals("ROLE_USER"));

            if(isAdmin){
                System.out.println("is admin!!!!");
                return "admin";
            }
            else if (isUser){
                System.out.println("is user!!!!");
                return "user";
            }
        }
        return "non-user";
    }

    public boolean roleIsAdmin(HttpServletRequest request){
        String s = this.headerJWTCheck(request);
        if(s.equalsIgnoreCase("admin")){
            return true;
        }return false;
    }

    //관리자의 멤버에 관한 서비스 (회원가입, 회원수정, 회원삭제, 회원보기)
    @GetMapping("/admin/members")
    public ResponseEntity<Response> showAllMembers(HttpServletRequest request){

        String message = "";
        List<Member> allMember = null;
        
        if(roleIsAdmin(request)){
            try{
                allMember= adminService.retrieveAllUser(); //모든 멤버 retrieve
            }
            catch (Exception e){
                message = "회원 조회 중 오류 발생";
                return new ResponseEntity<>(new Response_s_m(false, message), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        else{
            return new ResponseEntity<>(new Response_s_m(false, "you are not an admin."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(new Response_s_l<Member>(true, allMember), HttpStatus.OK);
    }


    @PostMapping("/admin/members")
    public ResponseEntity<Response> signup(HttpServletRequest request, @Valid @RequestBody MemberCreateForm memberCreateForm, BindingResult bindingResult) {
        String message = "";

        if(!roleIsAdmin(request)){
            return new ResponseEntity<>(new Response_s_m(false, "you are not an admin."), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if(bindingResult.hasErrors()){
            message = String.valueOf(bindingResult);
            System.out.println("Binding errors: " + bindingResult);
            return new ResponseEntity<>(new Response_s_m(false, message), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if((!memberCreateForm.getStudent_type().equalsIgnoreCase("ob"))&&(!memberCreateForm.getStudent_type().equalsIgnoreCase("yb"))){
            message= "ob/yb type has error";
            return new ResponseEntity<>(new Response_s_m(false, message), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        this.adminService.create(memberCreateForm.getId(),memberCreateForm.getName(), memberCreateForm.getPassword(), memberCreateForm.getMajor(), memberCreateForm.getEmail(), memberCreateForm.getStudent_type(), memberCreateForm.getAdmin());

        message = memberCreateForm.getName()+"(님) 회원가입 성공";
        return new ResponseEntity<>(new Response_s_m(true, message), HttpStatus.OK);
    }

    @DeleteMapping("/admin/members")
    public ResponseEntity<Response> delete_member(HttpServletRequest request, @RequestBody Map<String, String> requestBody){
        if(!roleIsAdmin(request)){
            return new ResponseEntity<>(new Response_s_m(false, "you are not an admin."), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        String id = requestBody.get("id");
        String message = "";

        try{
            this.adminService.deleteUser(id);
            message = id + " 삭제 완료";
        }
        catch (Exception e){
            message = e.getMessage();
            return new ResponseEntity<>(new Response_s_m(false, message), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(new Response_s_m(true, message), HttpStatus.OK);
    }

    @PatchMapping("/admin/members")
    public ResponseEntity<Response> edit_member(HttpServletRequest request, @RequestBody List<Member> members) {

        if(!roleIsAdmin(request)){
            return new ResponseEntity<>(new Response_s_m(false, "you are not an admin."), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        String message = "";
        try {
            for (Member member : members) {
                Member editMember = this.memberRepository.findById(member.getId()).get();
                if (editMember != null) {
                    this.adminService.editUser(member);
                }
            }
            message = "수정 완료";
        } catch (Exception e) {

            message = e.getMessage();
            return new ResponseEntity<>(new Response_s_m(false, message), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(new Response_s_m(true, message), HttpStatus.OK);
    }


    //출석 체크 멤버들 보기
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/admin/attendance")
    public ResponseEntity<Response> showAllAttendance(HttpServletRequest request){

        if(!roleIsAdmin(request)){
            return new ResponseEntity<>(new Response_s_m(false, "you are not an admin."), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        List<AttendanceReponseDTO> attendanceReponseDTOList = new ArrayList<>();;
        String message = "";
        List<Session> allAttendance ;
        try{
            allAttendance= adminService.retrieveAllAttendance();
            for (Session attendance: allAttendance){
                LocalDate localDate = attendance.getTodayDate();
                String formattedDate = localDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                String attendance_status = String.valueOf(attendance.getAttendance_status());
                AttendanceReponseDTO attendacneDTO = new AttendanceReponseDTO(attendance.getId(), attendance.getMember().getName(),attendance.getSession_type(), attendance_status, formattedDate);
                attendanceReponseDTOList.add(attendacneDTO);
            }
        }
        catch (Exception e){
            message = e.getMessage();
            return new ResponseEntity<>(new Response_s_m(false, message), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(new Response_attendance(true, attendanceReponseDTOList), HttpStatus.OK);
    }

//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/admin/attendance/thu")
    public ResponseEntity<Response_s_m> saveAttendanceThu(HttpServletRequest request, @RequestBody List<AttendanceRequestDTO> attendanceRequests){

        if(!roleIsAdmin(request)){
            return new ResponseEntity<>(new Response_s_m(false, "you are not an admin."), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        String message = "";
        try{
            for (AttendanceRequestDTO attendanceRequest : attendanceRequests){
                String memberId = attendanceRequest.getId();
                MemberAttendance attendance_status = MemberAttendance.valueOf(attendanceRequest.getAttendance_status());
                String todayDate = attendanceRequest.getTodayDate();
                LocalDate date = LocalDate.parse(todayDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));

                Member member = this.memberRepository.findById(memberId).get();

                boolean success= this.adminService.createAttendanceThu(member,attendance_status,date);
                if(success){
                    this.adminService.setFine(memberId);
                }

            }
            message = "출결 정보 저장 완료";
        }catch (Exception e){
            message = e.getMessage();
            return new ResponseEntity<>(new Response_s_m(false, message), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(new Response_s_m(true, message), HttpStatus.OK);
    }
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/admin/attendance/sat")
    public ResponseEntity<Response_s_m> saveAttendanceSat(HttpServletRequest request, @RequestBody List<AttendanceRequestDTO> attendanceRequests){

        if(!roleIsAdmin(request)){
            return new ResponseEntity<>(new Response_s_m(false, "you are not an admin."), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        String message = "";
        try{
            for (AttendanceRequestDTO attendanceRequest : attendanceRequests){
                String memberId = attendanceRequest.getId();
                MemberAttendance attendance_status = MemberAttendance.valueOf(attendanceRequest.getAttendance_status());
                String todayDate = attendanceRequest.getTodayDate();
                LocalDate date = LocalDate.parse(todayDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));

                Member member = this.memberRepository.findById(memberId).get();

                boolean success= this.adminService.createAttendanceSat(member,attendance_status,date);
                if(success){
                    this.adminService.setFine(memberId);
                }

            }
            message = "출결 정보 저장 완료";
        }catch (Exception e){
            message = "출결 정보 저장 중 오류 발생";
            return new ResponseEntity<>(new Response_s_m(false, message), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(new Response_s_m(true, message), HttpStatus.OK);
    }

    @PatchMapping("/admin/attendance")
    public ResponseEntity<Response> editAttendance(HttpServletRequest request, @RequestBody List<MemberEditDTO> editAttendances){

        if(!roleIsAdmin(request)){
            return new ResponseEntity<>(new Response_s_m(false, "you are not an admin."), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        String message = "";
        try{
            for (MemberEditDTO editAttendance:editAttendances){
                this.adminService.editAttendance(editAttendance);
            }
            message = "출결 수정 완료";
        }catch (Exception e){
            message = "출결 수정 중 오류 발생";
            return new ResponseEntity<>(new Response_s_m(false, message), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(new Response_s_m(true, message), HttpStatus.OK);
    }
    //과제 체크
}
