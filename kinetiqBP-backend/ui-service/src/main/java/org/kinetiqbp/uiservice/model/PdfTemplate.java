package org.kinetiqbp.uiservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class PdfTemplate {
  @Id
  private Long id;

  @NonNull
  private Date createdDate;

  @NonNull
  private Date modifiedDate;

  @ManyToOne
  @JoinColumn(name = "created_by", nullable = false)
  @NonNull
  private User createdBy;
}
