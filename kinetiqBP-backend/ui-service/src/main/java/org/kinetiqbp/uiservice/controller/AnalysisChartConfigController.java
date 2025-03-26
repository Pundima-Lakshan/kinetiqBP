package org.kinetiqbp.uiservice.controller;

import org.kinetiqbp.uiservice.dto.request.AnalysisChartConfigPostRequest;
import org.kinetiqbp.uiservice.model.AnalysisChartConfig;
import org.kinetiqbp.uiservice.service.AnalysisChartConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/analysis-config")
public class AnalysisChartConfigController {
    private final AnalysisChartConfigService analysisChartConfigService;

    @Autowired
    public AnalysisChartConfigController(AnalysisChartConfigService analysisChartConfigService) {
        this.analysisChartConfigService = analysisChartConfigService;
    }

    @GetMapping
    public List<AnalysisChartConfig> getAnalysisChartConfig(@RequestParam String id) {
        return analysisChartConfigService.findAllByCreatedBy(id);
    }

    @PostMapping
    public AnalysisChartConfig createAnalysisChartConfig(@RequestBody AnalysisChartConfigPostRequest analysisChartConfigPostRequest) {
        AnalysisChartConfig analysisChartConfig = new AnalysisChartConfig(analysisChartConfigPostRequest.getFormSchema());
        return analysisChartConfigService.save(analysisChartConfig, analysisChartConfigPostRequest.getCreatedBy());
    }

    @DeleteMapping("/{id")
    public void deleteAnalysisChartConfig(@PathVariable Integer id) {
        analysisChartConfigService.deleteById(id);
    }

}
