using System.Net.Mail;
using System.Net;

namespace TASKHIVE.Service
{
    public interface IEmailService
    {
        Task SendWelcomeEmailAsync(string toEmail, string userName, string temporaryPassword);
        Task SendPasswordResetEmailAsync(string toEmail, string userName);
    }

    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task SendWelcomeEmailAsync(string toEmail, string userName, string temporaryPassword)
        {
            var subject = "Welcome to TASKHIVE - Your Account Details";
            var body = $@"
                <html>
                <body>
                    <h2>Welcome to TASKHIVE, {userName}!</h2>
                    <p>Your account has been successfully created.</p>
                    <p><strong>Temporary Password:</strong> {temporaryPassword}</p>
                    <p>Please use this temporary password to login and reset your password immediately.</p>
                    <p><strong>Important:</strong> This is a temporary password. Please change it after your first login.</p>
                    <br/>
                    <p>Best regards,<br/>TASKHIVE Team</p>
                </body>
                </html>";

            await SendEmailAsync(toEmail, subject, body);
        }

        public async Task SendPasswordResetEmailAsync(string toEmail, string userName)
        {
            var subject = "Password Reset Successful - TASKHIVE";
            var body = $@"
                <html>
                <body>
                    <h2>Password Reset Successful</h2>
                    <p>Hello {userName},</p>
                    <p>Your password has been successfully reset.</p>
                    <p>If you did not initiate this reset, please contact our support team immediately.</p>
                    <br/>
                    <p>Best regards,<br/>TASKHIVE Team</p>
                </body>
                </html>";

            await SendEmailAsync(toEmail, subject, body);
        }

        private async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            try
            {
                var smtpServer = _configuration["Email:SmtpServer"] ?? "smtp.gmail.com";
                var portStr = _configuration["Email:Port"] ?? "587";
                int.TryParse(portStr, out int port);
                if (port == 0) port = 587;

                var username = _configuration["Email:Username"] ?? Environment.GetEnvironmentVariable("SMTP_USERNAME") ?? "";
                var rawPassword = _configuration["Email:Password"] ?? Environment.GetEnvironmentVariable("SMTP_PASSWORD") ?? "";
                var password = rawPassword.Replace(" ", "");
                var fromEmail = _configuration["Email:FromEmail"] ?? Environment.GetEnvironmentVariable("SMTP_FROM_EMAIL") ?? username;

                if (string.IsNullOrWhiteSpace(username) || username.Contains("YOUR_") || string.IsNullOrWhiteSpace(password) || password.Contains("YOUR_"))
                {
                    _logger.LogWarning("SMTP credentials are not configured. Configure Email:Username and Email:Password in appsettings.json or environment variables to enable email dispatch.");
                    return;
                }

                using (var client = new SmtpClient(smtpServer, port))
                {
                    client.EnableSsl = true;
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential(username, password);

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress(fromEmail, "TASKHIVE"),
                        Subject = subject,
                        Body = body,
                        IsBodyHtml = true
                    };
                    mailMessage.To.Add(toEmail);

                    await client.SendMailAsync(mailMessage);
                }

                _logger.LogInformation($"Email sent successfully to {toEmail}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to send email to {toEmail}");
            }
        }
    }
}
