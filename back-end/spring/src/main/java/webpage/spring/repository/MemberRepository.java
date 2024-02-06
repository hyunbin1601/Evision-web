package webpage.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import webpage.spring.domain.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByName(String name);
}
