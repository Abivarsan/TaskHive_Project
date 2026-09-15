using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.DTO.Users
{
    public class ForgotPasswordDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
