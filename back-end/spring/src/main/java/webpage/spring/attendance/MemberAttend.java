package webpage.spring.attendance;

import java.time.LocalDate;

public class MemberAttend {
    private Long memberId;
    private AttendEnum attendance;
    private LocalDate selectedDate;
    public MemberAttend() {
    }

    public MemberAttend(Long memberId, AttendEnum attendance, LocalDate selectedDate) {
        this.memberId = memberId;
        this.attendance = attendance;
        this.selectedDate = selectedDate;
    }

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public AttendEnum getAttendStandard() {
        return attendance;
    }

    public void setAttendStandard(AttendEnum attendance) {
        this.attendance = attendance;
    }

    public LocalDate getSelectedDate() {
        return selectedDate;
    }

    public void setSelectedDate(LocalDate selectedDate) {
        this.selectedDate = selectedDate;
    }

}
