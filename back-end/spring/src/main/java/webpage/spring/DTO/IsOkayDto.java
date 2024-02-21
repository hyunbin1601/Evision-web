package webpage.spring.DTO;

public class IsOkayDto {
    private String id;
    private boolean isOkayThu;
    private boolean isOkaySat;

    public IsOkayDto(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public boolean isOkayThu() {
        return isOkayThu;
    }

    public boolean isOkaySat() {
        return isOkaySat;
    }

    public void setIsOkayThu(boolean isOkayThu) {
        this.isOkayThu = isOkayThu;
    }

    public void setIsOkaySat(boolean isOkaySat) {
        this.isOkaySat = isOkaySat;
    }
}
