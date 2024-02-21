package webpage.spring.service;


import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import webpage.spring.domain.Member;
import webpage.spring.domain.MemberRole;
import webpage.spring.repository.MemberRepository;

@RequiredArgsConstructor
@Service
public class UserSecurityService implements UserDetailsService {

    private final MemberRepository memberRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Member member = this.memberRepository.findById(username).get();

        if (member == null) {
            throw new UsernameNotFoundException("사용자를 찾을수 없습니다.");
        }
        List<GrantedAuthority> authorities = new ArrayList<>();
        boolean role = member.getAdmin();

        if(role){
            authorities.add(new SimpleGrantedAuthority(MemberRole.ADMIN.getValue()));
        } else {
            authorities.add(new SimpleGrantedAuthority(MemberRole.USER.getValue()));
        }
        return new User(String.valueOf(member.getId()), member.getPassword(), authorities);
    }


//    public UserDetails loadUserById(String id) throws UsernameNotFoundException {
//
//        Optional<Member> _siteUser = this.memberRepository.findById(id);
//        if (_siteUser.isEmpty()) {
//            throw new UsernameNotFoundException("사용자를 찾을수 없습니다.");
//        }
//        Member siteUser = _siteUser.get(); //id를 가지고 user 찾기
//        List<GrantedAuthority> authorities = new ArrayList<>();
//        boolean role = siteUser.getAdmin(); //user가 admin인지
//        if (role) {
//            authorities.add(new SimpleGrantedAuthority(MemberRole.ADMIN.getValue()));
//        } else {
//            authorities.add(new SimpleGrantedAuthority(MemberRole.USER.getValue()));
//        }
//        return new User(String.valueOf(siteUser.getId()), siteUser.getPassword(), authorities);
//    }
}