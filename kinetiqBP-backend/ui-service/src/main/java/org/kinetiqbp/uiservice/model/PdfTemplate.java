package org.kinetiqbp.uiservice.model;

import jakarta.persistence.*;
import lombok.*;
import org.jetbrains.annotations.NotNull;
import org.kinetiqbp.uiservice.dto.request.PdfTemplatePostRequestData;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PdfTemplate {
  @Id
  @NonNull
  private String id;

  @NonNull
  private Date createdDate;

  @NonNull
  private Date modifiedDate;

  @ManyToOne
  @JoinColumn(name = "created_by", nullable = false)
  @NonNull
  private User createdBy;

  @ManyToOne
  @JoinColumn(name = "last_modified_by", nullable = false)
  @NonNull
  private User lastModifiedBy;
}
