package org.kinetiqbp.uiservice.service.minio;

import io.minio.ObjectWriteResponse;
import io.minio.Result;
import io.minio.StatObjectResponse;
import io.minio.errors.*;
import io.minio.messages.Item;
import org.kinetiqbp.uiservice.configuration.minio.MinioConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

@Service
public class MinioService {
    private final MinioConfiguration minioConfiguration;
    private final MinioServiceUtils minioServiceUtils;

    @Autowired
    public MinioService(MinioServiceUtils minioServiceUtils, MinioConfiguration minioConfiguration) {
        this.minioServiceUtils = minioServiceUtils;
        this.minioConfiguration = minioConfiguration;
    }

    public String uploadFile(MultipartFile file) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        String fileName = file.getOriginalFilename();
        String newFileName = System.currentTimeMillis() + "." + fileName.substring(fileName.lastIndexOf(".") + 1);
        String contentType = file.getContentType();
        ObjectWriteResponse response = minioServiceUtils.uploadFile(minioConfiguration.getBucketName(), file, newFileName, contentType);
        return newFileName;
    }

    public List<ObjectWriteResponse> uploadFiles(List<MultipartFile> files) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        List<ObjectWriteResponse> responses = new ArrayList<>();

        List<String> fileNames = new ArrayList<>();
        List<String> contentTypes = new ArrayList<>();

        for (MultipartFile file : files) {
            fileNames.add(file.getOriginalFilename());
            contentTypes.add(file.getContentType());
        }

        return minioServiceUtils.uploadFiles(minioConfiguration.getBucketName(), files, fileNames, contentTypes);
    }

    public void deleteFile(String fileName) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        minioServiceUtils.removeFile(minioConfiguration.getBucketName(), fileName);
    }

    public StatObjectResponse getFileStatusInfo(String fileName) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        return minioServiceUtils.getFileStatusInfo(minioConfiguration.getBucketName(), fileName);
    }

    public StatObjectResponse getFileStatusInfo(String fileName, String versionId) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        return minioServiceUtils.getFileStatusInfo(minioConfiguration.getBucketName(), fileName, versionId);
    }

    public String getPreSignedObjectUrl(String fileName) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        return minioServiceUtils.getPreSignedObjectUrl(minioConfiguration.getBucketName(), fileName);
    }

    public String getPreSignedObjectUrl(String fileName, String versionId) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        return minioServiceUtils.getPreSignedObjectUrl(minioConfiguration.getBucketName(), fileName, versionId);
    }

    public InputStream downloadFile(String fileName) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
//        response.setHeader("Content-Disposition", "attachment;filename=" + fileName);
//        response.setContentType("application/force-download");
//        response.setCharacterEncoding("UTF-8");
//        IOUtils.copy(fileInputStream, response.getOutputStream());
        return minioServiceUtils.getObject(minioConfiguration.getBucketName(), fileName);
    }

    public List<Result<Item>> listObjects() {
        Iterable<Result<Item>> objects = minioServiceUtils.listObjects(minioConfiguration.getBucketName(), true);

        List<Result<Item>> objectsList = new ArrayList<>();
        for (Result<Item> object : objects) {
            objectsList.add(object);
        }

        return objectsList;
    }

    public List<Result<Item>> listObjects(String prefix) {
        Iterable<Result<Item>> objects = minioServiceUtils.listObjects(minioConfiguration.getBucketName(), prefix,true);

        List<Result<Item>> objectsList = new ArrayList<>();
        for (Result<Item> object : objects) {
            objectsList.add(object);
        }

        return objectsList;
    }
}

