package org.kinetiqbp.uiservice.controller;

import org.kinetiqbp.uiservice.service.HelloWorldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class HelloWorldController {
    
    private final HelloWorldService helloWorldService;

    @Autowired
    public HelloWorldController(HelloWorldService helloWorldService) {
        this.helloWorldService = helloWorldService;
    }

    @GetMapping("/hello")
    public String sayHello(@RequestHeader("Authorization") String authorizationHeader) {
        return helloWorldService.processData().toString();
    }
}
