using System.ComponentModel.DataAnnotations;
using TASKHIVE.Model;

namespace TASKHIVE.DTO.Category
{
    public class CreateCategoryDto
    {
        [Key]
        public int categoryId { get; set; }

        [Required]
        public CategoryStatus categoryStatus { get; set; } = CategoryStatus.Development;
    }
}
