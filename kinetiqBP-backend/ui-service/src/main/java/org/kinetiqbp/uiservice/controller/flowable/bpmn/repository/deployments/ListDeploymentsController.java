package org.kinetiqbp.uiservice.controller.flowable.bpmn.repository.deployments;

import org.flowable.common.rest.api.DataResponse;
import org.flowable.rest.service.api.repository.DeploymentResponse;
import org.kinetiqbp.uiservice.service.flowable.bpmn.repository.deployments.ListDeploymentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class ListDeploymentsController {
    private final ListDeploymentsService listDeploymentsService;
    
    @Autowired
    public ListDeploymentsController(ListDeploymentsService listDeploymentsService) {
        this.listDeploymentsService = listDeploymentsService;
    }

    @GetMapping("/deployments")
    public DataResponse<DeploymentResponse> listDeployments(@RequestParam Map<String, String> allRequestParams) {
        return listDeploymentsService.listDeployments(allRequestParams);
    }
}
