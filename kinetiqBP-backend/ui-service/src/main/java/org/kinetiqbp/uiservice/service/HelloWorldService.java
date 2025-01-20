package org.kinetiqbp.uiservice.service;

import org.kinetiqbp.uiservice.model.HelloWorld;
import org.kinetiqbp.uiservice.repository.HelloWorldRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HelloWorldService {

    private final HelloWorldRepository helloWorldRepository;

    @Autowired
    public HelloWorldService(HelloWorldRepository helloWorldRepository) {
        this.helloWorldRepository = helloWorldRepository;
    }

    public List<HelloWorld> processData() {
        return helloWorldRepository.findAll();
    }
}
