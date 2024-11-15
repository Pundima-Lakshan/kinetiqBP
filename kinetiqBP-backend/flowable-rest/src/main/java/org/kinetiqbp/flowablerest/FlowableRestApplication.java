package org.kinetiqbp.flowablerest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(proxyBeanMethods = false)
public class FlowableRestApplication {

    public static void main(String[] args) {
        SpringApplication.run(FlowableRestApplication.class, args);
    }

}
