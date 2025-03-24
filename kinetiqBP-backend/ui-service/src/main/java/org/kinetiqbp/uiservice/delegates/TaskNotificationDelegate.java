package org.kinetiqbp.uiservice.delegates;

import jakarta.mail.MessagingException;
import org.flowable.engine.delegate.DelegateExecution;
import org.flowable.engine.delegate.JavaDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.kinetiqbp.uiservice.service.EmailService;

@Component
public class TaskNotificationDelegate implements JavaDelegate {
  private final EmailService emailService;

  @Autowired
  public TaskNotificationDelegate(EmailService emailService) {
    this.emailService = emailService;
  }

  @Override
  public void execute(DelegateExecution execution) {
    String email_to = (String) execution.getVariable("email_to");
    String processInstanceId = execution.getProcessInstanceId();
    String processDefinitionId = execution.getProcessDefinitionId();
    try {
      emailService.sendHtmlEmail(email_to, "A Task is awaiting your attention", processInstanceId, processDefinitionId);
    } catch (MessagingException e) {
      throw new RuntimeException(e);
    }
  }

  public void sendEmail(DelegateExecution execution, String to) {
    String processInstanceId = execution.getProcessInstanceId();
    String processDefinitionId = execution.getProcessDefinitionId();
    try {
      emailService.sendHtmlEmail(to, "A Task is awaiting your attention", processInstanceId, processDefinitionId);
    } catch (MessagingException e) {
      throw new RuntimeException(e);
    }
  }
}
