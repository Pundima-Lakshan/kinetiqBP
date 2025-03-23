package org.kinetiqbp.uiservice.service;

import io.minio.Result;
import io.minio.StatObjectResponse;
import io.minio.errors.*;
import io.minio.messages.Item;
import org.kinetiqbp.uiservice.dto.request.PdfTemplatePostRequestData;
import org.kinetiqbp.uiservice.dto.response.PdfTemplateGetResponse;
import org.kinetiqbp.uiservice.model.PdfTemplate;
import org.kinetiqbp.uiservice.model.PdfTemplateUserInvolvement;
import org.kinetiqbp.uiservice.model.User;
import org.kinetiqbp.uiservice.repository.PdfTemplateRepository;
import org.kinetiqbp.uiservice.repository.PdfTemplateUserInvolvementRepository;
import org.kinetiqbp.uiservice.repository.UsersRepository;
import org.kinetiqbp.uiservice.service.minio.MinioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class PdfTemplateService {
    private final MinioService minioService;
    private final PdfTemplateRepository pdfTemplateRepository;
    private final UsersRepository usersRepository;
    private final PdfTemplateUserInvolvementRepository pdfTemplateUserInvolvementRepository;

    @Autowired
    public PdfTemplateService(MinioService minioService, PdfTemplateRepository pdfTemplateRepository, UsersRepository usersRepository,
                              PdfTemplateUserInvolvementRepository pdfTemplateUserInvolvementRepository) {

        this.minioService = minioService;
        this.pdfTemplateRepository = pdfTemplateRepository;
        this.usersRepository = usersRepository;
        this.pdfTemplateUserInvolvementRepository = pdfTemplateUserInvolvementRepository;
    }

    public List<PdfTemplate> uploadFiles(List<MultipartFile> files,
                                         List<PdfTemplatePostRequestData> pdfTemplateEntries) throws
            IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException,
            InternalException, ServerException, InsufficientDataException, ErrorResponseException {

        minioService.uploadFiles(files);

        List<PdfTemplate> pdfTemplates = new ArrayList<>();
        List<PdfTemplateUserInvolvement> pdfTemplateUserInvolvements = new ArrayList<>();

        for (int i = 0; i < files.size(); i++) {
            PdfTemplatePostRequestData pdfTemplateRequestData = pdfTemplateEntries.get(i);

            User createdUser = usersRepository
                    .findById(pdfTemplateRequestData.getCreatedBy())
                    .orElseThrow(() -> new NoSuchElementException("Created user not found"));

            User lastModifiedUser = usersRepository
                    .findById(pdfTemplateRequestData.getLastModifiedBy())
                    .orElseThrow(() -> new NoSuchElementException("Last modified user not found"));

            PdfTemplate pdfTemplate = new PdfTemplate(
                    pdfTemplateRequestData.getId(),
                    pdfTemplateRequestData.getCreatedDate(),
                    pdfTemplateRequestData.getModifiedDate(),
                    createdUser,
                    lastModifiedUser);

            PdfTemplateUserInvolvement pdfTemplateUserInvolvement = new PdfTemplateUserInvolvement(
                    pdfTemplate.getId() + pdfTemplate.getLastModifiedBy(),
                    pdfTemplate.getModifiedDate());

            pdfTemplates.add(pdfTemplate);
            pdfTemplateUserInvolvements.add(pdfTemplateUserInvolvement);
        }

        List<PdfTemplate> responsesTemplateRepository =
                pdfTemplateRepository.saveAll(pdfTemplates);

        for (int i = 0; i < responsesTemplateRepository.size(); i++) {
            PdfTemplate pdfTemplate =
                    responsesTemplateRepository.get(i);
            PdfTemplateUserInvolvement pdfTemplateUserInvolvement = pdfTemplateUserInvolvements.get(i);

            pdfTemplateUserInvolvement.setPdfTemplate(pdfTemplate);
        }

        pdfTemplateUserInvolvementRepository.saveAll(pdfTemplateUserInvolvements);

        return responsesTemplateRepository;
    }

    public List<PdfTemplate> getPdfTemplates() {
        return pdfTemplateRepository.findAll();
    }

    public PdfTemplateGetResponse getPdfTemplate(String id) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        PdfTemplate pdfTemplate = pdfTemplateRepository.findById(id).orElseThrow(() -> new NoSuchElementException("PDF template not found"));
        StatObjectResponse statObjectResponse = minioService.getFileStatusInfo(id);
        List<PdfTemplateUserInvolvement> userInvolvements = pdfTemplateUserInvolvementRepository.findAllByPdfTemplate(pdfTemplate);

        return new PdfTemplateGetResponse(pdfTemplate, statObjectResponse, userInvolvements);
    }

    public List<PdfTemplateUserInvolvement> getPdfTemplateUserInvolvements() {
        return pdfTemplateUserInvolvementRepository.findAll();
    }

    public List<Result<Item>> listObjects() {
        return minioService.listObjects();
    }
}
