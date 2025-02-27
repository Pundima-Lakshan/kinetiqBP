package org.kinetiqbp.uiservice.controller.flowable.bpmn.runtime.processInstances;

import org.flowable.common.engine.api.FlowableIllegalArgumentException;
import org.flowable.common.engine.api.FlowableObjectNotFoundException;
import org.flowable.engine.IdentityService;
import org.flowable.engine.RuntimeService;
import org.flowable.engine.runtime.ProcessInstance;
import org.flowable.engine.runtime.ProcessInstanceBuilder;
import org.flowable.rest.service.api.runtime.process.ProcessInstanceCreateRequest;
import org.flowable.rest.service.api.runtime.process.ProcessInstanceResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/process-api/runtime/process-instances")
public class ProcessInstancesController {

    private final RuntimeService runtimeService;
    private final IdentityService identityService;

    @Autowired
    public ProcessInstancesController(RuntimeService runtimeService, IdentityService identityService) {
        this.runtimeService = runtimeService;
        this.identityService = identityService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProcessInstanceResponse createProcessInstance(@RequestBody ProcessInstanceCreateRequest request) {
        if (request.getProcessDefinitionId() == null && request.getProcessDefinitionKey() == null && request.getMessage() == null) {
            throw new FlowableIllegalArgumentException("Either processDefinitionId, processDefinitionKey or message is required.");
        }

        int paramsSet = ((request.getProcessDefinitionId() != null) ? 1 : 0) + ((request.getProcessDefinitionKey() != null) ? 1 : 0) + ((request.getMessage() != null) ? 1 : 0);

        if (paramsSet > 1) {
            throw new FlowableIllegalArgumentException("Only one of processDefinitionId, processDefinitionKey or message should be set.");
        }

        if (request.isTenantSet()) {
            // Tenant-id can only be used with either key or message
            if (request.getProcessDefinitionId() != null) {
                throw new FlowableIllegalArgumentException("TenantId can only be used with either processDefinitionKey or message.");
            }
        }

        ProcessInstanceResponse processInstanceResponse;

        // Actually start the instance based on key or id
        try {
            ProcessInstance instance;

            ProcessInstanceBuilder processInstanceBuilder = runtimeService.createProcessInstanceBuilder();
            if (request.getProcessDefinitionId() != null) {
                processInstanceBuilder.processDefinitionId(request.getProcessDefinitionId());
            }
            if (request.getProcessDefinitionKey() != null) {
                processInstanceBuilder.processDefinitionKey(request.getProcessDefinitionKey());
            }
            if (request.getMessage() != null) {
                processInstanceBuilder.messageName(request.getMessage());
            }
            if (request.getName() != null) {
                processInstanceBuilder.name(request.getName());
            }
            if (request.getBusinessKey() != null) {
                processInstanceBuilder.businessKey(request.getBusinessKey());
            }
            if (request.isTenantSet()) {
                processInstanceBuilder.tenantId(request.getTenantId());
            }
            if (request.getOverrideDefinitionTenantId() != null && !request.getOverrideDefinitionTenantId().isEmpty()) {
                processInstanceBuilder.overrideProcessDefinitionTenantId(request.getOverrideDefinitionTenantId());
            }
            if (request.getOutcome() != null) {
                processInstanceBuilder.outcome(request.getOutcome());
            }

            identityService.setAuthenticatedUserId(request.getStartUserId());
            instance = processInstanceBuilder.start();

            processInstanceResponse = new ProcessInstanceResponse();
            processInstanceResponse.setId(instance.getProcessInstanceId());
            processInstanceResponse.setProcessDefinitionId(instance.getProcessDefinitionId());
            processInstanceResponse.setBusinessKey(instance.getBusinessKey());
            processInstanceResponse.setSuspended(instance.isSuspended());
            processInstanceResponse.setEnded(instance.isEnded());
            processInstanceResponse.setStartTime(instance.getStartTime());
            processInstanceResponse.setStartUserId(instance.getStartUserId());
            
        } catch (FlowableObjectNotFoundException e) {
            throw new FlowableIllegalArgumentException(e.getMessage(), e);
        } finally {
            identityService.setAuthenticatedUserId(null);
        }

        return processInstanceResponse;

    }
}
