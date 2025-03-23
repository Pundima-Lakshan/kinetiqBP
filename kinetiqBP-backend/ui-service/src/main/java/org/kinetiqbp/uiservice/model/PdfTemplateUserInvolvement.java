package org.kinetiqbp.uiservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import org.jetbrains.annotations.NotNull;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PdfTemplateUserInvolvement {
    @Id
    @NonNull
    private String id;

    @NonNull
    private Date date;

    @ManyToOne
    @JoinColumn(name = "pdf_template", nullable = false)
    @NonNull
    private PdfTemplate pdfTemplate;

    public PdfTemplateUserInvolvement(@NotNull String id, @NotNull Date date) {
        this.id = id;
        this.date = date;
    }
}
