using System.ComponentModel.DataAnnotations;
using TASKHIVE.Model;

namespace TASKHIVE.DTO.Category
{
    public class UpdateCategoryDto
    {
        [Key]
        public int categoryId { get; set; }

        [Required]
        public CategoryStatus categoryStatus { get; set; } = CategoryStatus.Development;
    }
}
