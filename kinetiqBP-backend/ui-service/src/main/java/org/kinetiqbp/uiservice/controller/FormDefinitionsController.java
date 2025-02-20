package org.kinetiqbp.uiservice.controller;

import org.kinetiqbp.uiservice.dto.request.FormDefinitionPostRequest;
import org.kinetiqbp.uiservice.dto.request.FormDefinitionPutRequest;
import org.kinetiqbp.uiservice.model.FormDefinition;
import org.kinetiqbp.uiservice.service.FormDefinitionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/form-definitions")
public class FormDefinitionsController {
    private final FormDefinitionsService formDefinitionsService;
    
    @Autowired
    public FormDefinitionsController(FormDefinitionsService formDefinitionsService) {
        this.formDefinitionsService = formDefinitionsService;
    }

    @GetMapping
    ResponseEntity<List<FormDefinition>> getFormDefinitions() {
        List<FormDefinition> response = formDefinitionsService.getFormDefinitions();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    ResponseEntity<FormDefinition> getFormDefinitionById(@PathVariable Long id) {
        FormDefinition response = formDefinitionsService.getFormDefinitionById(id);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping
    ResponseEntity<FormDefinition> postFormDefinition(@RequestBody FormDefinitionPostRequest formDefinitionPostRequest) {
        FormDefinition newFormDefinition = new FormDefinition(
                formDefinitionPostRequest.getFormId(),
                formDefinitionPostRequest.getVersion(),
                formDefinitionPostRequest.getDescription(),
                formDefinitionPostRequest.getCreatedDate(),
                formDefinitionPostRequest.getCreatedDate(),
                formDefinitionPostRequest.getFormSchema());
        FormDefinition response = formDefinitionsService.postFormDefinition(newFormDefinition, formDefinitionPostRequest.getCreatedBy());
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/{id}")
    ResponseEntity<FormDefinition> updateFormDefinition(@RequestBody FormDefinitionPutRequest formDefinitionPutRequest) {
        FormDefinition updatedFormDefinition = new FormDefinition(
                formDefinitionPutRequest.getId(), 
                formDefinitionPutRequest.getFormId(),
                formDefinitionPutRequest.getVersion(),
                formDefinitionPutRequest.getDescription(),
                formDefinitionPutRequest.getCreatedDate(),
                formDefinitionPutRequest.getModifiedDate(),
                formDefinitionPutRequest.getCreatedBy(),
                formDefinitionPutRequest.getFormSchema());
        FormDefinition response = formDefinitionsService.updateFormDefinition(updatedFormDefinition);
        return ResponseEntity.ok(response);
    }
}
