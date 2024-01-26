package webpage.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import webpage.spring.attendance.AttendEnum;
import webpage.spring.attendance.MemberAttend;
import webpage.spring.domain.Member;
import webpage.spring.repository.MemberRepositoryImpl;
import webpage.spring.service.MemberService;

import java.time.LocalDate;


@Controller
public class MemberAttendanceController {
    private final MemberRepositoryImpl memberRepository;
    private final MemberService memberService;
    @Autowired
    public MemberAttendanceController(MemberRepositoryImpl memberRepository, MemberService memberService) {
        this.memberRepository = memberRepository;
        this.memberService = memberService;
    }
    @GetMapping("/admin/attendance")
    public String showAttendance(Model model) {

        model.addAttribute("members", memberRepository.getAllMembers());
        model.addAttribute("attendances", AttendEnum.values());
        model.addAttribute("attendanceMember", new MemberAttend());

        return "attendance";
    }

    @PostMapping("/admin/attendance")
    public String checkAttendance(@ModelAttribute MemberAttend attendanceCheck) {
        Long memberId = attendanceCheck.getMemberId();
        LocalDate selectedDate = attendanceCheck.getSelectedDate();

        Member member = memberRepository.findById(memberId)
                .orElse(null);
        if (member==null) {
            throw new IllegalArgumentException("no member with such id");
        }

        member.saveAttendance(selectedDate, attendanceCheck);
        memberRepository.save(member, member.getId(), member.getPw());

        return "redirect:/admin/attendance";
    }

    @PatchMapping("/admin/attendance")
    public String modifyAttendance(@ModelAttribute MemberAttend attendanceCheck) {
        Long memberId = attendanceCheck.getMemberId();
        LocalDate selectedDate = attendanceCheck.getSelectedDate();

        Member member = memberRepository.findById(memberId)
                .orElse(null);
        if (member==null) {
            throw new IllegalArgumentException("no member with such id");
        }

        memberService.saveAttendance(memberId, selectedDate, attendanceCheck);

        return "redirect:/admin/attendance";
    }
}



