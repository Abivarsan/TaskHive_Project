using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.Model
{
    public enum CategoryStatus
    {
        Development,
        Testing, 
        Design
    }
    public class Category
    {
        [Key]
        public int categoryId { get; set; }

        [Required]
        public CategoryStatus categoryStatus { get; set; } = CategoryStatus.Development;

        public ICollection<Work> Works { get; set; }
    }
}
