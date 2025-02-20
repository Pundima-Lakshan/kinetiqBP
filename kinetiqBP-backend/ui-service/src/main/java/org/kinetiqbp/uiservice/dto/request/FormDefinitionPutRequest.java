package org.kinetiqbp.uiservice.dto.request;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.*;
import org.kinetiqbp.uiservice.model.User;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FormDefinitionPutRequest {
    @NonNull
    private Integer id;

    @NonNull
    private String formId;

    @NonNull
    private String version;

    @NonNull
    private String description;

    @NonNull
    private Date createdDate;
    
    @NonNull
    private Date modifiedDate;

    @NonNull
    private User createdBy;

    @NonNull
    private JsonNode formSchema;
}
