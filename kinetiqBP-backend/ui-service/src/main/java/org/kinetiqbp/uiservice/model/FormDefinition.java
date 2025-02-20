package org.kinetiqbp.uiservice.model;

import com.fasterxml.jackson.databind.JsonNode;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class FormDefinition {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

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
    private String createdBy;

    @NonNull
    @Type(JsonType.class)
    @Column(columnDefinition = "json")
    private JsonNode formSchema;
}
