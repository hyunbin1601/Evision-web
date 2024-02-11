package webpage.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import webpage.spring.domain.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
//    Optional<Member> findById(String id);
    Member findByName(String name);
}
