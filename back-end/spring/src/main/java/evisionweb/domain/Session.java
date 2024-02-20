package evisionweb.domain;

public class Session {

    private Integer date;
    private String sessiontype;
    private Boolean attendance;
    private Boolean assignment;

    public Integer getDate() {
        return date;
    }

    public void setDate(Integer date) {
        this.date = date;
    }

    public String getSessiontype() {
        return sessiontype;
    }

    public void setSessiontype(String sessiontype) {
        this.sessiontype = sessiontype;
    }

    public Boolean getAttendance() {
        return attendance;
    }

    public void setAttendance(Boolean attendance) {
        this.attendance = attendance;
    }

    public Boolean getAssignment() {
        return assignment;
    }

    public void setAssignment(Boolean assignment) {
        this.assignment = assignment;
    }

}
