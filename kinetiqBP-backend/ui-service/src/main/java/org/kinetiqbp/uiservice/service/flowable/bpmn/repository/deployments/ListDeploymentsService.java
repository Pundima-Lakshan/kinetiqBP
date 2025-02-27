package org.kinetiqbp.uiservice.service.flowable.bpmn.repository.deployments;

import org.flowable.common.rest.api.DataResponse;
import org.flowable.engine.RepositoryService;
import org.flowable.engine.RuntimeService;
import org.flowable.engine.TaskService;
import org.flowable.rest.service.api.repository.DeploymentResponse;
import org.kinetiqbp.uiservice.feign.FlowableBpmnRestInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ListDeploymentsService {
    private final FlowableBpmnRestInterface flowableBpmnRestInterface;

    @Autowired
    public ListDeploymentsService(FlowableBpmnRestInterface flowableBpmnRestInterface) {
        this.flowableBpmnRestInterface = flowableBpmnRestInterface;
    }

    public DataResponse<DeploymentResponse> listDeployments(Map<String, String> allRequestParams) {
        return flowableBpmnRestInterface.getDeployments(allRequestParams);
    }
}
