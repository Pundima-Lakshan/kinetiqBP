package org.kinetiqbp.uiservice.repository;

import org.kinetiqbp.uiservice.model.PdfTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PdfTemplateRepository extends JpaRepository<PdfTemplate, String> {
}
