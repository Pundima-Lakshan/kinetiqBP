package org.kinetiqbp.uiservice.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.minio.Result;
import io.minio.errors.*;
import io.minio.messages.Item;
import org.kinetiqbp.uiservice.dto.request.PdfTemplatePostRequestData;
import org.kinetiqbp.uiservice.dto.response.PdfTemplateGetResponse;
import org.kinetiqbp.uiservice.model.PdfTemplate;
import org.kinetiqbp.uiservice.model.PdfTemplateUserInvolvement;
import org.kinetiqbp.uiservice.service.PdfTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pdf-templates")
public class PdfTemplateController {
    private final PdfTemplateService pdfTemplateService;

    @Autowired
    public PdfTemplateController(PdfTemplateService pdfTemplateService) {
        this.pdfTemplateService = pdfTemplateService;
    }

    @PostMapping
    ResponseEntity<List<PdfTemplate>> postPdfTemplate(MultipartHttpServletRequest request) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        String data = request.getParameter("data");
        ObjectMapper objectMapper = new ObjectMapper();
        List<PdfTemplatePostRequestData> pdfTemplateRequestDataEntries = objectMapper.readValue(data, new TypeReference<List<PdfTemplatePostRequestData>>() {
        });

        List<MultipartFile> filesList = request.getFileMap().values().stream().toList();
        List<PdfTemplate> responses = pdfTemplateService.uploadFiles(filesList, pdfTemplateRequestDataEntries);

        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    ResponseEntity<PdfTemplateGetResponse> getPdfTemplates(@PathVariable String id) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        PdfTemplateGetResponse response = pdfTemplateService.getPdfTemplate(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/file-url/{id}")
    ResponseEntity<String> getPreSignedObjectUrl(@PathVariable String id) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        String response = pdfTemplateService.getPreSignedObjectUrl(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    ResponseEntity<List<PdfTemplate>> getPdfTemplates() {
        List<PdfTemplate> templates = pdfTemplateService.getPdfTemplates();
        return ResponseEntity.ok(templates);
    }

    @GetMapping("/user-involvements")
    ResponseEntity<List<PdfTemplateUserInvolvement>> getPdfTemplateUserInvolvements() {
        List<PdfTemplateUserInvolvement> userInvolvements = pdfTemplateService.getPdfTemplateUserInvolvements();
        return ResponseEntity.ok(userInvolvements);
    }

    @GetMapping("/object-names")
    ResponseEntity<List<String>> getPdfTemplateObjectNames() throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        List<Result<Item>> objects = pdfTemplateService.listObjects();

        List<String> objectNames = new ArrayList<>();
        for (Result<Item> object : objects) {
            objectNames.add(object.get().objectName());
        }

        return ResponseEntity.ok(objectNames);
    }
}
