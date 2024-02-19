package webpage.spring.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import webpage.spring.DTO.AssignmentResponseDTO;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class Response_assignment implements Response{

    private boolean success;
    private List<AssignmentResponseDTO> member_assignment;

}
