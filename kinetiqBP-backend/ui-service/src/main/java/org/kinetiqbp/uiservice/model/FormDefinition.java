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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    @NonNull
    private User createdBy;

    @NonNull
    @Type(JsonType.class)
    @Column(columnDefinition = "json")
    private JsonNode formSchema;
    
    public FormDefinition(@NonNull String formId, @NonNull String version, @NonNull String description, @NonNull Date createdDate, @NonNull Date modifiedDate, @NonNull JsonNode formSchema) {
        this.formId = formId;
        this.version = version;
        this.description = description;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.formSchema = formSchema;
    }
}
