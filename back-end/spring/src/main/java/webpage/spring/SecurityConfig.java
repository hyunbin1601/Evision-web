package webpage.spring;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.bind.annotation.GetMapping;
import webpage.spring.domain.MemberRole;
import webpage.spring.jwt.JwtToken;
import webpage.spring.jwt.JwtTokenProvider;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }


    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager ) throws Exception {

        http

                .authorizeHttpRequests((authorizeHttpRequests) -> authorizeHttpRequests
                        .requestMatchers(
                                new AntPathRequestMatcher("/**"), //나중에 관리자 만들고 지우기
                                new AntPathRequestMatcher("/"),
                                new AntPathRequestMatcher("/login"),
                                new AntPathRequestMatcher("/recruiting"),
                                new AntPathRequestMatcher("/about")
                        ).permitAll() //이 url에 대해서는 누구나 허용
                        .requestMatchers("/admin/**").hasRole(MemberRole.ADMIN.name()) //admin만 허용
                        .anyRequest().authenticated())//user+admin 접근 가능
                .csrf((csrf) -> csrf
                        .ignoringRequestMatchers(new AntPathRequestMatcher("/**")))
                .headers((headers) -> headers
                        .addHeaderWriter(new XFrameOptionsHeaderWriter(
                                XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN)));
//                .formLogin((formLogin) -> formLogin
//                        .usernameParameter("id")
//                        .passwordParameter("password")
//                        .loginPage("/login")
//                        .successHandler((request, response, authentication) -> {
//                            SecurityContextHolder.getContext().setAuthentication(authentication);
//
//                            JwtToken jwtToken = jwtTokenProvider.generateToken(authentication);
//                            HttpSession session = request.getSession(true);
//                            session.setAttribute("name", authentication.getName());
//                            session.setAttribute("accessToken", jwtToken.getAccessToken());
//                            response.sendRedirect("/");
//                        })
//                        .defaultSuccessUrl("/"))
//                .logout((logout) -> logout
//                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
//                        .logoutSuccessUrl("/")
//                        .invalidateHttpSession(true));
        http
                .httpBasic(withDefaults())
                .csrf(withDefaults())
                .cors(cors -> cors.disable())
                .logout((logout) -> logout
                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                        // 성공하면 루트 페이지로 이동
                        .logoutSuccessUrl("/")
                        // 로그아웃 시 생성된 사용자 세션 삭제
                        .invalidateHttpSession(true));

        return http.build();
    }




}
