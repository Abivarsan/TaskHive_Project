using System.ComponentModel.DataAnnotations;
using TASKHIVE.Model;

namespace TASKHIVE.DTO.UserWork
{
    public class CreateUserWorkDto
    {
        [Key]
        [Required]
        public int userWorkId { get; set; }

        [Required]
        public int userId { get; set; }

        [Required]
        public int workId { get; set; }
    }
}
