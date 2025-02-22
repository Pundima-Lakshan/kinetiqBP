package org.kinetiqbp.uiservice.repository;

import org.kinetiqbp.uiservice.model.FormDefinition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormDefinitionsRepository extends JpaRepository<FormDefinition, Integer> {
}
