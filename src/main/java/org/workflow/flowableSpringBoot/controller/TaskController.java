package org.workflow.flowableSpringBoot.controller;

import lombok.Data;
import lombok.Setter;
import org.flowable.task.api.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.workflow.flowableSpringBoot.service.TaskService;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TaskController {
    @Setter(onMethod_ = @Autowired)
    private TaskService taskService;

    @RequestMapping(value = "/tasks", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<TaskRepresentation> getTasks(@RequestParam String assignee) {
        List<Task> tasks = taskService.getTasks(assignee);
        List<TaskRepresentation> dtos = new ArrayList<>();
        for (Task task : tasks) {
            dtos.add(new TaskRepresentation(task.getId(), task.getName()));
        }
        return dtos;
    }

    @Data
    static class TaskRepresentation {
        private final String id;
        private final String name;

        public TaskRepresentation(String id, String name) {
            this.id = id;
            this.name = name;
        }
    }

}