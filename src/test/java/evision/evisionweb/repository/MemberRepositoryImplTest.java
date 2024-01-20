package evision.evisionweb.repository;

import evision.evisionweb.domain.Member;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MemberRepositoryImplTest {

    MemberRepository repository = new MemberRepositoryImpl();

    @Test
    public void save() {
        Member member = new Member();
        member.setName("TestUser");
        member.setId(1234567L);
        member.setPw("TestPw1234");
        repository.save(member, member.getId(), member.getPw());

        Member result = repository.findById(member.getId()).get();
        System.out.println("result = "+(result==member));
    }

    @Test
    void findById() {
        Member member1 = new Member();
        member1.setId(1234567L);
        repository.save(member1, member1.getId(), member1.getPw());

        Member member2 = new Member();
        member2.setId(7654321L);
        repository.save(member2, member2.getId(), member2.getPw());

        Member result = repository.findById(1234567L).get();
        System.out.println("result = "+(result==member1));
    }

    @Test
    void getAllMembers() {

    }

    @Test
    void delete() {
        Member member1 = new Member();
        member1.setId(1234567L);
        repository.save(member1, member1.getId(), member1.getPw());

        Member member2 = new Member();
        member2.setId(7654321L);
        repository.save(member2, member2.getId(), member2.getPw());

        repository.delete(member1);

        Boolean result = repository.getAllMembers().contains(member1);
        System.out.println("result = "+(result==false));
    }
}