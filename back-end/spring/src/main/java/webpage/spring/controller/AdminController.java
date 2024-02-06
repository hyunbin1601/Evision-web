package webpage.spring.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import webpage.spring.DTO.MemberEditDTO;
import webpage.spring.response.Response;
import webpage.spring.domain.Member;
import webpage.spring.domain.MemberCreateForm;
import webpage.spring.response.Response_s_l;
import webpage.spring.response.Response_s_m;
import webpage.spring.service.AdminService;
import webpage.spring.domain.AttendanceMember;

import java.util.List;

//@RestController
@CrossOrigin(origins = "http://admin")
@RequiredArgsConstructor
@Controller
public class AdminController {

    private final AdminService adminService;

    //관리자의 멤버에 관한 서비스 (회원가입, 회원수정, 회원삭제, 회원보기)
    @GetMapping("/admin/members")
    public ResponseEntity<Response> showAllMembers(){
        String message = "";
        List<Member> allMember ;
        try{
            allMember= adminService.retrieveAllUser();
        }
        catch (Exception e){
            message = "회원 조회 중 오류 발생";
            return new ResponseEntity<>(new Response_s_m(false, message), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(new Response_s_l<Member>(true, allMember), HttpStatus.OK);
    }
    @GetMapping("/admin/members/signup") //회원가입 페이지로 이동
    public String signup(MemberCreateForm memberCreateForm){
        return "sign-up"; //회원가입 폼
    }
    @PostMapping("/admin/members")
    public ResponseEntity<Response> signup(@Valid MemberCreateForm memberCreateForm, BindingResult bindingResult){
        String message = "";
        if(bindingResult.hasErrors()){
            message = "bindingResult has error";
            return new ResponseEntity<>(new Response_s_m(false, message), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if((!memberCreateForm.getStudent_type().equalsIgnoreCase("ob"))&&(!memberCreateForm.getStudent_type().equalsIgnoreCase("yb"))){
            message= "ob/yb type has error";
            return new ResponseEntity<>(new Response_s_m(false, message), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        this.adminService.create(memberCreateForm.getId(), memberCreateForm.getPassword(), memberCreateForm.getMajor(), memberCreateForm.getEmail(), memberCreateForm.getStudent_type(), memberCreateForm.getAdmin());

        message = memberCreateForm.getName()+"(님) 회원가입 성공";
        return new ResponseEntity<>(new Response_s_m(true, message), HttpStatus.OK);
    }

    @GetMapping("/admin/members/{id}")
    public ResponseEntity<Response> delete_member(@PathVariable Long id){
        String message = "";
        try{
            this.adminService.deleteUser(id);
            message = id + " 삭제 완료";
        }
        catch (Exception e){
            message = id + " 삭제 중 오류 발생";
            return new ResponseEntity<>(new Response_s_m(false, message), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(new Response_s_m(true, message), HttpStatus.OK);
    }
    @GetMapping("/admin/members/edit") //회원 수정 페이지로 이동
    public String edit(Model model){
        List<Member> allUser = adminService.retrieveAllUser();
        model.addAttribute("allUser", allUser);
        return "edit"; //회원 수정 폼
    }
    @PatchMapping("/admin/members")
    public ResponseEntity<Response> edit_member(@RequestBody List<Member> members) {
        String message = "";
        try {
            for (Member member : members) {
                this.adminService.editUser(member);
            }
            message = "수정 완료";
        } catch (Exception e) {

            message = "수정 중 오류 발생";
            return new ResponseEntity<>(new Response_s_m(false, message), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(new Response_s_m(true, message), HttpStatus.OK);
    }


    //출석 체크 멤버들 보기
    @GetMapping("/admin/attendance")
    public ResponseEntity<Response> showAllAttendance(){
        String message = "";
        List<AttendanceMember> allAttendance ;
        try{
            allAttendance= adminService.retrieveAllAttendance();
        }
        catch (Exception e){
            message = "회원 조회 중 오류 발생";
            return new ResponseEntity<>(new Response_s_m(false, message), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(new Response_s_l<AttendanceMember>(true, allAttendance), HttpStatus.OK);
    }

    //출석체크 하는 곳으로 이동
    @GetMapping("/admin/attendance/write")
    public String attendance(Model model) {
        return "attendance-form";
    }

    @PostMapping("/admin/attendance")
    public ResponseEntity<Response_s_m> showAttendance(@RequestParam List<AttendanceMember> attendances){
        String message = "";
        try{
            for (AttendanceMember attendance: attendances){
                this.adminService.createAttendance(attendance.getMember(), attendance.getAttendance_status());
            }
            message = "출결 정보 저장 완료";
        }catch (Exception e){
            message = "출결 정보 저장 중 오류 발생";
            return new ResponseEntity<>(new Response_s_m(false, message), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(new Response_s_m(true, message), HttpStatus.OK);
    }

    @PatchMapping("/admin/attendance")
    public ResponseEntity<Response> editAttendance(List<MemberEditDTO> editAttendances){
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
