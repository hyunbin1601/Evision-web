package webpage.spring.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import webpage.spring.DTO.LoginDTO;
import webpage.spring.domain.MemberRole;
import webpage.spring.domain.Session;
import webpage.spring.response.Response;
import webpage.spring.DTO.MemberInfoDTO;
import webpage.spring.domain.Member;
import webpage.spring.jwt.JwtToken;
import webpage.spring.jwt.JwtTokenProvider;
import webpage.spring.response.Response_login;
import webpage.spring.response.Response_s_in_l;
import webpage.spring.response.Response_s_m;
import webpage.spring.service.MemberService;
import webpage.spring.repository.MemberRepository;
import webpage.spring.service.AdminService;
import webpage.spring.service.UserSecurityService;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class MemberController {

    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final UserDetailsService userDetailsService;
    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectMapper objectMapper;

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

    @GetMapping("/login")
    public String login(){
        return "login-form";
    }
    @ResponseBody
    @PostMapping("/login")
    public ResponseEntity<Response_login> login(@RequestBody LoginDTO loginDTO) {
        boolean success = memberService.login(loginDTO.getId(), loginDTO.getPassword());

        Member member = this.memberRepository.findById(loginDTO.getId()).get();
        System.out.println(member.getName());

        JwtToken token = null;

        if (success) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(member.getId());
            Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, loginDTO.getPassword(), userDetails.getAuthorities());
            token = jwtTokenProvider.generateToken(authentication);
        }
        System.out.println(token.getAccessToken());
        return new ResponseEntity<>(new Response_login(success, token.getAccessToken()), HttpStatus.OK);
    }

    //로그아웃 이거 말로 세큐리티로 함
//    @PostMapping("/logout")
//    public ResponseEntity<Response> logout(HttpSession session) {
//        session.invalidate();
//        return new ResponseEntity<>(new Response_s_m(true,"logout success"), HttpStatus.OK);
//    }

    //my page 보기(내정보)
    @GetMapping("/users/mypage")
    public ResponseEntity<Response> viewMypage(HttpServletRequest request, @RequestBody String id) throws JsonProcessingException {

        String s = this.headerJWTCheck(request);

        MemberInfoDTO user_info = null;
        List<Session> attendance_status = new ArrayList<>();
        Member user = null;

        JsonNode jsonNode = objectMapper.readTree(id);
        id = jsonNode.get("id").asText(); //request body에서 뽑아온 id

        if(s.equalsIgnoreCase("admin")||s.equalsIgnoreCase("user")){
            Optional<Member> optionalMember = this.memberRepository.findById(id);
            if(optionalMember.isPresent()){
                user = this.memberRepository.findById(id).get();
                user_info= this.memberService.get_user_info(user);
            }else{
                System.out.println("no member with such id");
            }

            attendance_status = this.memberService.assignment_submitted(user);
            //과제 리스트 해야함

        }

        return new ResponseEntity<>(new Response_s_in_l(true, user_info, attendance_status), HttpStatus.OK);
    }
}