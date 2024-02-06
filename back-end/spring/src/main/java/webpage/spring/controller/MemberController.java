package webpage.spring.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import webpage.spring.response.Response;
import webpage.spring.domain.AttendanceMember;
import webpage.spring.DTO.MemberInfoDTO;
import webpage.spring.domain.Member;
import webpage.spring.jwt.JwtToken;
import webpage.spring.jwt.JwtTokenProvider;
import webpage.spring.response.Response_login;
import webpage.spring.response.Response_s_in_l;
import webpage.spring.service.MemberService;
import webpage.spring.repository.MemberRepository;
import webpage.spring.service.AdminService;
import webpage.spring.service.UserSecurityService;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class MemberController {

    private MemberRepository memberRepository;
    private final AdminService adminService;
    private MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private UserSecurityService userSecurityService;
    private UserDetailsService userDetailsService;

    //로그인
    @GetMapping("/login")
    public String login(){

        return "login-form";
    }

    @PostMapping("/login")
    public String login(@RequestParam("id") Long id, @RequestParam("password") String password){
        System.out.println(id);
        System.out.println(password);
        boolean success = this.memberService.login(id, password);
        System.out.println(success);
        Member member = this.memberRepository.getById(id);
        UserDetails userDetails = userDetailsService.loadUserByUsername(member.getName());
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
        JwtTokenProvider tokenProvider = new JwtTokenProvider("1234");
        JwtToken token = tokenProvider.generateToken(authentication);
        return new Response_login(success, token).toString();
    }

    //로그아웃
    @GetMapping("/logout")
    public String logout(){
        return "logout-form";
    }

    //my page 보기(내정보)
    @GetMapping("/mypage")
    public ResponseEntity<Response> viewMypage(@AuthenticationPrincipal Member currentUser){

        Member user = this.memberRepository.getById(currentUser.getId());
        MemberInfoDTO user_info= this.memberService.get_user_info(user);

        List<AttendanceMember> attendance_status = this.memberService.assignment_submitted(user);

        return new ResponseEntity<>(new Response_s_in_l(true, user_info, attendance_status), HttpStatus.OK);
    }


}
