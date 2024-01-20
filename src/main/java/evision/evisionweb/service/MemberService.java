package evision.evisionweb.service;

import evision.evisionweb.domain.Member;
import evision.evisionweb.repository.MemberRepository;
import evision.evisionweb.repository.MemberRepositoryImpl;

public class MemberService {

    private final MemberRepository memberRepository = new MemberRepositoryImpl();

    public void join(Member member, Long id, String pw){
        memberRepository.save(member, id, pw);
    }

    public boolean login(Member member, Long enteredid, String enteredpw, Boolean enteredadmin){
        Member result = memberRepository.findById(enteredid).get();
        if(enteredpw==result.getPw()){
            return true;
        }
        else return false;
    }

    public boolean adminlogin(Member member, Long enteredid, String enteredpw, Boolean enteredadmin){
        Member result = memberRepository.findById(enteredid).get();
        if((enteredpw==result.getPw())&&(enteredadmin)){
            return true;
        }
        else return false;
    }

}
