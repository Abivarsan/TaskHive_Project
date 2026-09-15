using System.ComponentModel.DataAnnotations;
using TASKHIVE.Model;

namespace TASKHIVE.DTO.Users
{
    public class CreateUserDto
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

        [Required]
        public int userCategoryId { get; set; }
    }
}
