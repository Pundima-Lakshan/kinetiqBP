package org.kinetiqbp.flowablerest.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final JavaMailSender mailSender;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }

    public void sendHtmlEmail(String to, String subject, String processInstanceId, String processDefinitionId) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();

        message.setFrom(new InternetAddress("noreply@kinetiqbp.com"));
        message.setRecipients(MimeMessage.RecipientType.TO, to);
        message.setSubject(subject);

        String htmlContent = "<html>"
                + "<head>"
                + "<style>"
                + "  body { font-family: 'Roboto', sans-serif; background-color: #f4f6f8; margin: 0; padding: 0; }"
                + "  .container { background-color: #ffffff; max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }"
                + "  .header { background-color: #1976d2; color: white; padding: 15px; text-align: center; border-radius: 8px 8px 0 0; font-size: 24px; font-weight: bold; }"
                + "  .content { padding: 20px; color: #333; font-size: 16px; line-height: 1.5; }"
                + "  .task-info { font-size: 18px; font-weight: bold; color: #1976d2; margin-bottom: 20px; }"
                + "  .button { display: inline-block; background-color: #1976d2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 16px; margin-top: 20px; text-align: center; }"
                + "  .button:hover { background-color: #1565c0; }"
                + "  .footer { margin-top: 30px; font-size: 12px; color: #888; text-align: center; }"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<div class='container'>"
                + "  <div class='header'>Task Notification</div>"
                + "  <div class='content'>"
                + "    <p><strong>Process Instance ID:</strong> " + processInstanceId + "</p>"
                + "    <p class='task-info'>A task is awaiting your action. Please review and take necessary steps.</p>"
                + "    <a href='http://localhost:13403/workflow-instances/" + processDefinitionId + "/" + processInstanceId + "' class='button'>View Task</a>"
                + "  </div>"
                + "  <div class='footer'>"
                + "    <p>If you have any questions, please contact support.</p>"
                + "    <p><strong>Powered by KinetiqBP</strong></p>"
                + "  </div>"
                + "</div>"
                + "</body>"
                + "</html>";


        message.setContent(htmlContent, "text/html; charset=utf-8");

        mailSender.send(message);
    }
}
