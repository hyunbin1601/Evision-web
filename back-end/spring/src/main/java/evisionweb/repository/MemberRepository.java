package evisionweb.repository;

import evision.evisionweb.domain.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {

    Member save(Member member, Long id, String pw);
    Optional<Member> findById(Long id);
    List<Member> getAllMembers();
    void delete(Member member);

}
