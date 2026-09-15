using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.DTO.UserCategory
{
    public class UpdateUserCategoryDto
    {
        [Key]
        [Required]
        public int userCategoryId { get; set; }
        public string UserCategoryName { get; set; }
    }
}
