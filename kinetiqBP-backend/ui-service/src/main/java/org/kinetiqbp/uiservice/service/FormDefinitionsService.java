package org.kinetiqbp.uiservice.service;

import org.kinetiqbp.uiservice.dto.request.FormDefinitionPostRequest;
import org.kinetiqbp.uiservice.model.FormDefinition;
import org.kinetiqbp.uiservice.repository.FormDefinitionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FormDefinitionsService {

    private final FormDefinitionsRepository formDefinitionsRepository;

    @Autowired
    public FormDefinitionsService(FormDefinitionsRepository formDefinitionsRepository) {
        this.formDefinitionsRepository = formDefinitionsRepository;
    }

    public FormDefinition postFormDefinition(FormDefinition formDefinition) {
        return formDefinitionsRepository.save(formDefinition);
    }
    
    public FormDefinition updateFormDefinition(FormDefinition formDefinition) {
        return formDefinitionsRepository.save(formDefinition);
    }

    public List<FormDefinition> getFormDefinitions() {
        return formDefinitionsRepository.findAll();
    }
    
    public FormDefinition getFormDefinitionById(Long id) {
        return formDefinitionsRepository.findById(id).orElseThrow();
    }
}
