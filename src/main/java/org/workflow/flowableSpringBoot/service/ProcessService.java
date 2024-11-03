package org.workflow.flowableSpringBoot.service;

import lombok.Setter;
import org.flowable.engine.RuntimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.workflow.flowableSpringBoot.model.entity.Person;
import org.workflow.flowableSpringBoot.repository.PersonRepository;

import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
public class ProcessService {
    @Setter(onMethod_ = @Autowired)
    private RuntimeService runtimeService;

    @Setter(onMethod_ = @Autowired)
    private PersonRepository personRepository;

    public void startProcess(String assignee) {
        Person person = personRepository.findByUsername(assignee);

        Map<String, Object> variables = new HashMap<>();
        variables.put("person", person);
        runtimeService.startProcessInstanceByKey("oneTaskProcess", variables);
    }
}
