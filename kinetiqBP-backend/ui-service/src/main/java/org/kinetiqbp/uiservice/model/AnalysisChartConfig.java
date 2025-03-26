package org.kinetiqbp.uiservice.model;

import com.fasterxml.jackson.databind.JsonNode;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;
import org.jetbrains.annotations.NotNull;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class AnalysisChartConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    @NonNull
    private User createdBy;

    @NonNull
    @Type(JsonType.class)
    @Column(columnDefinition = "json")
    private JsonNode configSchema;

    public AnalysisChartConfig(@NotNull JsonNode configSchema) {
        this.configSchema = configSchema;
    }
}
