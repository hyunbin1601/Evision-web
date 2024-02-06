package webpage.spring.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import webpage.spring.jwt.JwtToken;

@Getter
@Setter
@AllArgsConstructor
public class Response_login implements Response{
    private boolean success;
    private JwtToken token;

}
