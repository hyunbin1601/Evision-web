package webpage.spring;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import webpage.spring.domain.Member;
import webpage.spring.domain.MemberAttendance;
import webpage.spring.repository.MemberRepository;

import java.time.LocalDate;

@SpringBootTest
public class ApplicationTests {

	@Autowired
	private MemberRepository memberRepository;


	@Test
	public void testJPA() {
		Member m1=new Member();
		m1.setId("2271076");
		m1.setName("김지선");
		m1.setMajor("사이버보안전공");
		m1.setEmail("serah1238@ewhain.net");
		m1.setPassword("1234");
		m1.setStudent_type("ob");
		m1.setFine(0);
		m1.setAdmin(true);
		m1.setTotal_settlement(30000);

		this.memberRepository.save(m1);



		//삭제 테스트
//		assertEquals(2, this.memberRepository.count());
//		Optional<Member> oq= this.memberRepository.findById(2271079L);
//		assertTrue(oq.isPresent());
//		Member m = oq.get();
//		this.memberRepository.delete(m);
//		assertEquals(1, this.memberRepository.count());


		String id =  "2271076";
		String password = "1234";
		System.out.println(password);
		Member member = this.memberRepository.findById(id).get();
		System.out.println(member.getPassword());


	}

}
