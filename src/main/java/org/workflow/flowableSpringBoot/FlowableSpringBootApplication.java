package org.workflow.flowableSpringBoot;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.workflow.flowableSpringBoot.service.FlowableUsersService;

@SpringBootApplication(proxyBeanMethods = false)
public class FlowableSpringBootApplication {

    public static void main(String[] args) {
        SpringApplication.run(FlowableSpringBootApplication.class, args);
    }

    @Bean
    public CommandLineRunner init(final FlowableUsersService flowableUsersService) {

        return strings -> flowableUsersService.createDemoUsers();
    }

}
