package org.kinetiqbp.uiservice.feign;

import io.swagger.annotations.*;
import org.flowable.common.rest.api.DataResponse;
import org.flowable.rest.service.api.repository.DeploymentResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@FeignClient(name = "FLOWABLE-REST", path = "/process-api")
public interface FlowableBpmnRestInterface {
    @ApiOperation(value = "List Deployments", tags = {"Deployment"}, nickname = "listDeployments")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "name", dataType = "string", value = "Only return deployments with the given name.", paramType = "query"),
            @ApiImplicitParam(name = "nameLike", dataType = "string", value = "Only return deployments with a name like the given name.", paramType = "query"),
            @ApiImplicitParam(name = "category", dataType = "string", value = "Only return deployments with the given category.", paramType = "query"),
            @ApiImplicitParam(name = "categoryNotEquals", dataType = "string", value = "Only return deployments which do not have the given category.", paramType = "query"),
            @ApiImplicitParam(name = "parentDeploymentId", dataType = "string", value = "Only return deployments with the given parent deployment id.", paramType = "query"),
            @ApiImplicitParam(name = "parentDeploymentIdLike", dataType = "string", value = "Only return deployments with a parent deployment id like the given value.", paramType = "query"),
            @ApiImplicitParam(name = "tenantId", dataType = "string", value = "Only return deployments with the given tenantId.", paramType = "query"),
            @ApiImplicitParam(name = "tenantIdLike", dataType = "string", value = "Only return deployments with a tenantId like the given value.", paramType = "query"),
            @ApiImplicitParam(name = "withoutTenantId", dataType = "boolean", value = "If true, only returns deployments without a tenantId set. If false, the withoutTenantId parameter is ignored.", paramType = "query"),
            @ApiImplicitParam(name = "sort", dataType = "string", value = "Property to sort on, to be used together with the order.", allowableValues = "id,name,deployTime,tenantId", paramType = "query"),
    })
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Indicates the request was successful."),
    })
    @GetMapping(value = "/repository/deployments", produces = "application/json")
    DataResponse<DeploymentResponse> getDeployments(@ApiParam(hidden = true) @RequestParam Map<String, String> allRequestParams);
}
