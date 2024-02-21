package webpage.spring.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import webpage.spring.DTO.IsOkayDto;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ResponseOpenPage implements Response{

    private List<IsOkayDto> isOkayList;
    private boolean pageOpen;
    private boolean success;
    private String message;
}
