package webpage.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import webpage.spring.domain.Session;


public interface SessionRepository extends JpaRepository<Session, String> {


}
