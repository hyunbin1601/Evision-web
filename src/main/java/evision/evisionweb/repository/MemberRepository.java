package evision.evisionweb.repository;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import evision.evisionweb.domain.Member;
import jakarta.servlet.http.HttpSession;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {

    Member save(Member member, Long id, String pw);
    Optional<Member> findById(Long id);
    List<Member> getAllMembers();
    void delete(Member member);

}
