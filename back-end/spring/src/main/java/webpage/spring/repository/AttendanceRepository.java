package webpage.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import webpage.spring.domain.AttendanceMember;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<AttendanceMember, Long> {
    List<AttendanceMember> findAllById(Long id);
}
