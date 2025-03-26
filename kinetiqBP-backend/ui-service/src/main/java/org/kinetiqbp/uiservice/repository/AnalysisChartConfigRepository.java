package org.kinetiqbp.uiservice.repository;

import lombok.NonNull;
import org.kinetiqbp.uiservice.model.AnalysisChartConfig;
import org.kinetiqbp.uiservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnalysisChartConfigRepository extends JpaRepository<AnalysisChartConfig, Integer> {
    List<AnalysisChartConfig> findAllByCreatedBy(@NonNull User user);

}
