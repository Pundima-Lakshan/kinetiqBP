package org.kinetiqbp.uiservice.dto.response;

import io.minio.StatObjectResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.kinetiqbp.uiservice.model.PdfTemplate;
import org.kinetiqbp.uiservice.model.PdfTemplateUserInvolvement;
import org.kinetiqbp.uiservice.model.User;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PdfTemplateGetResponse {
    String id;
    Date createdDate;
    User createdBy;
    Date modifiedDate;
    User lastModifiedBy;
    List<PdfTemplateUserInvolvement> userInvolvements;
    Long size;
    String versionId;

    public PdfTemplateGetResponse(PdfTemplate pdfTemplate, StatObjectResponse statObjectResponse, List<PdfTemplateUserInvolvement> userInvolvements) {
        this.id = pdfTemplate.getId();
        this.createdDate = pdfTemplate.getCreatedDate();
        this.createdBy = pdfTemplate.getCreatedBy();
        this.modifiedDate = pdfTemplate.getModifiedDate();
        this.lastModifiedBy = pdfTemplate.getLastModifiedBy();
        this.userInvolvements = userInvolvements;
        this.size = statObjectResponse.size();
        this.versionId = statObjectResponse.versionId();
    }

}
