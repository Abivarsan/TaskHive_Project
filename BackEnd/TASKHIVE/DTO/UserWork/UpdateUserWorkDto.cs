using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.DTO.UserWork
{
    public class UpdateUserWorkDto
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
