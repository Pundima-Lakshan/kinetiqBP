package org.workflow.flowableSpringBoot.service;

import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.workflow.flowableSpringBoot.model.entity.Person;
import org.workflow.flowableSpringBoot.repository.PersonRepository;

import java.time.LocalDateTime;

@Service
@Transactional
public class FlowableUsersService {
    @Setter(onMethod_ = @Autowired)
    private PersonRepository personRepository;

    public void createDemoUsers() {
        if (personRepository.findAll().isEmpty()) {
            personRepository.save(new Person("jbarrez", "Joram", "Barrez",  LocalDateTime.now()));
            personRepository.save(new Person("trademakers", "Tijs", "Rademakers", LocalDateTime.now()));
        }
    }
}
