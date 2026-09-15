using System.ComponentModel.DataAnnotations;
using TASKHIVE.Model;

namespace TASKHIVE.DTO.Category
{
    public class GetAllCategoryDto
    {
        public int categoryId { get; set; }
        public CategoryStatus categoryStatus { get; set; } = CategoryStatus.Development;
    }
}
