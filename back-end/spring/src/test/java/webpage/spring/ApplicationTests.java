package webpage.spring;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import net.bytebuddy.asm.Advice;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import webpage.spring.domain.AttendanceMember;
import webpage.spring.domain.Member;
import webpage.spring.repository.AttendanceRepository;
import webpage.spring.repository.MemberRepository;

import java.time.LocalDate;
import java.util.Optional;

@SpringBootTest
public class ApplicationTests {

	@Autowired
	private MemberRepository memberRepository;
	@Autowired
	private AttendanceRepository attendanceRepository;

	@Test
	public void testJPA() {
		Member m1=new Member();
		m1.setId(2271076L);
		m1.setName("김지선");
		m1.setMajor("사이버보안전공");
		m1.setEmail("serah1238@ewhain.net");
		m1.setPassword("1234");
		m1.setStudent_type("ob");
		m1.setFine(0);
		m1.setAdmin(true);
		m1.setTotalSettlement(30000);

		this.memberRepository.save(m1);


		Member m2=new Member();
		m2.setId(2271079L);
		m2.setName("김지선2");
		m2.setMajor("사이버보안전공");
		m2.setEmail("1234@1234");
		m2.setPassword("password");
		m2.setStudent_type("yb");
		m2.setFine(0);
		m2.setAdmin(false);
		m2.setTotalSettlement(30000);

		this.memberRepository.save(m2);

		//삭제 테스트
//		assertEquals(2, this.memberRepository.count());
//		Optional<Member> oq= this.memberRepository.findById(2271079L);
//		assertTrue(oq.isPresent());
//		Member m = oq.get();
//		this.memberRepository.delete(m);
//		assertEquals(1, this.memberRepository.count());

		AttendanceMember attendanceMember = new AttendanceMember();
		attendanceMember.setId(m1.getId());
		attendanceMember.setTodayDate(LocalDate.now());
		attendanceMember.setAttendance_status(true);

		this.attendanceRepository.save(attendanceMember);
	}

}
