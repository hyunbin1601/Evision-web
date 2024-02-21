package webpage.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import webpage.spring.domain.Session;

import java.time.LocalDate;
import java.util.List;

public interface CheckRepository extends JpaRepository<Session, String> {
    List<Session> findAllById(String id);
    boolean existsByMemberIdAndTodayDate(String memberId, LocalDate todayDate);
    Session findAllByIdAndTodayDate(String id, LocalDate todayDate);
}
