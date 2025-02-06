package org.kinetiqbp.uiservice.configuration.logging;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CommonsRequestLoggingFilter;

@Configuration
public class RequestLoggingConfig {

    @Bean
    public CommonsRequestLoggingFilter logFilter() {
        CommonsRequestLoggingFilter filter = new CommonsRequestLoggingFilter();
        filter.setIncludeQueryString(true);
        filter.setIncludePayload(true);
        filter.setMaxPayloadLength(10000); // Limit payload size!
        filter.setIncludeHeaders(false);  // Usually don't need all headers
        filter.setBeforeMessagePrefix("BEFORE REQUEST: ");
        filter.setAfterMessagePrefix("AFTER REQUEST: ");
        filter.setIncludeClientInfo(false); // Set to true, If you want to log the client's IP address and session ID
        return filter;
    }
}
