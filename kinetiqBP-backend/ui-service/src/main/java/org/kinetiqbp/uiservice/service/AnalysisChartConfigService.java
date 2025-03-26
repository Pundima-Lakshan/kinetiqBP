package org.kinetiqbp.uiservice.service;

import lombok.NonNull;
import org.kinetiqbp.uiservice.model.AnalysisChartConfig;
import org.kinetiqbp.uiservice.model.User;
import org.kinetiqbp.uiservice.repository.AnalysisChartConfigRepository;
import org.kinetiqbp.uiservice.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;


@Service
public class AnalysisChartConfigService {
    private final AnalysisChartConfigRepository analysisChartConfigRepository;
    private final UsersRepository usersRepository;

    @Autowired
    public AnalysisChartConfigService(AnalysisChartConfigRepository analysisChartConfigRepository, UsersRepository usersRepository) {
        this.analysisChartConfigRepository = analysisChartConfigRepository;
        this.usersRepository = usersRepository;
    }

    public List<AnalysisChartConfig> findAllByCreatedBy(String userId) {
        User user = usersRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("Created user not found"));
        return analysisChartConfigRepository.findAllByCreatedBy(user);
    }

    public AnalysisChartConfig save(AnalysisChartConfig analysisChartConfig, String createdBy) {
        User createdUser = usersRepository.findById(createdBy).orElseThrow(() -> new NoSuchElementException("Created user not found"));
        analysisChartConfig.setCreatedBy(createdUser);
        return analysisChartConfigRepository.save(analysisChartConfig);
    }

    public void deleteById(Integer id) {
        analysisChartConfigRepository.deleteById(id);
    }
}
