package org.workflow.flowableSpringBoot.controller;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.workflow.flowableSpringBoot.service.ProcessService;

@RestController
public class ProcessController {
    @Setter(onMethod_ = @Autowired)
    private ProcessService processService;

    @PostMapping(value="/process")
    public void startProcessInstance(@RequestBody StartProcessRepresentation startProcessRepresentation) {
        processService.startProcess(startProcessRepresentation.getAssignee());
    }

    @Setter
    @Getter
    static class StartProcessRepresentation {

        private String assignee;

    }
}