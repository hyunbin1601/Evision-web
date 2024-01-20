package evision.evisionweb.repository;

import evision.evisionweb.domain.Member;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class MemberRepositoryImpl implements MemberRepository {

    private static Map<Long, Member> store = new HashMap<>();

    @Override
    public Member save(Member member, Long id, String pw) {
        member.setId(id);
        member.setPw(pw);
        store.put(id, member);
        return member;
    }

    @Override
    public Optional<Member> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public List<Member> getAllMembers() {
        return new ArrayList<>(store.values());
    }

    @Override
    public void delete(Member member) {
        store.remove(member.getId());
    }
}
