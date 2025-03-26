package org.kinetiqbp.uiservice.dto.request;

import com.fasterxml.jackson.databind.JsonNode;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import org.hibernate.annotations.Type;
import org.kinetiqbp.uiservice.model.User;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnalysisChartConfigPostRequest {

    @NonNull
    private String createdBy;

    @NonNull
    private JsonNode formSchema;
}
