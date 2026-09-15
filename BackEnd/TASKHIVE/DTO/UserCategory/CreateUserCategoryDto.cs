using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.DTO.UserCategory
{
    public class CreateUserCategoryDto
    {
        [Key]
        [Required]
        public int userCategoryId { get; set; }
        public string userCategoryName { get; set; }
    }
}
