package webpage.spring.domain;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.Getter;

@Getter
public enum MemberRole {

    ADMIN("ROLE_ADMIN"),
    USER("ROLE_USER");

    @Enumerated(EnumType.STRING)
    private final String value;

    MemberRole(String value) {
        this.value = value;
    }
}
