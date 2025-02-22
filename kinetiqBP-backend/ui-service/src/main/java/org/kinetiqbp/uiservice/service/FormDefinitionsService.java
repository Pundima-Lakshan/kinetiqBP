package org.kinetiqbp.uiservice.service;

import org.kinetiqbp.uiservice.dto.request.FormDefinitionPostRequest;
import org.kinetiqbp.uiservice.model.FormDefinition;
import org.kinetiqbp.uiservice.model.User;
import org.kinetiqbp.uiservice.repository.FormDefinitionsRepository;
import org.kinetiqbp.uiservice.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class FormDefinitionsService {

    private final FormDefinitionsRepository formDefinitionsRepository;
    private final UsersRepository usersRepository;

    @Autowired
    public FormDefinitionsService(FormDefinitionsRepository formDefinitionsRepository, UsersRepository usersRepository) {
        this.formDefinitionsRepository = formDefinitionsRepository;
        this.usersRepository = usersRepository;
    }

    public FormDefinition postFormDefinition(FormDefinition formDefinition, String createdBy) {
        User createdUser = usersRepository.findById(createdBy).orElseThrow(() -> new NoSuchElementException("Created user not found"));
        formDefinition.setCreatedBy(createdUser);
        return formDefinitionsRepository.save(formDefinition);
    }
    
    public FormDefinition updateFormDefinition(FormDefinition formDefinition) {
        return formDefinitionsRepository.save(formDefinition);
    }
    
    public void deleteFormDefinition(Integer id) {
       formDefinitionsRepository.deleteById(id);
    }

    public List<FormDefinition> getFormDefinitions() {
        return formDefinitionsRepository.findAll();
    }
    
    public FormDefinition getFormDefinitionById(Integer id) {
        return formDefinitionsRepository.findById(id).orElseThrow();
    }
}
