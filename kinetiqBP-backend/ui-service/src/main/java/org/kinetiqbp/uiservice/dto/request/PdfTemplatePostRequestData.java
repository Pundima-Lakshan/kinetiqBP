package org.kinetiqbp.uiservice.dto.request;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PdfTemplatePostRequestData {
    @NonNull
    private String id;

    @NonNull
    private Date createdDate;

    @NonNull
    private Date modifiedDate;

    @NonNull
    private String createdBy;

    @NonNull
    private String lastModifiedBy;
}
