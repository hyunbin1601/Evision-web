package webpage.spring.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Response_s_m implements Response{

    private boolean success;
    private String message;
}
