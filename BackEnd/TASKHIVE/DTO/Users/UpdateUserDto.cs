using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.DTO.Users
{
    public class UpdateUserDto
    {

        [Key]
        [Required]
        public int userId { get; set; }

        [Required]
        public string userName { get; set; }

        [Required]
        public string email { get; set; }

        [Required]
        public string password { get; set; }

        [Required]
        public int roleId { get; set; }
    }
}
