package org.kinetiqbp.uiservice.repository;

import lombok.NonNull;
import org.kinetiqbp.uiservice.model.PdfTemplate;
import org.kinetiqbp.uiservice.model.PdfTemplateUserInvolvement;
import org.kinetiqbp.uiservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PdfTemplateUserInvolvementRepository extends JpaRepository<PdfTemplateUserInvolvement, String> {
    List<PdfTemplateUserInvolvement> findAllByPdfTemplate(@NonNull PdfTemplate pdfTemplate);
}
