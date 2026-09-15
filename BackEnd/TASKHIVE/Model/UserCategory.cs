using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.Model
{
    public class UserCategory
    {
        [Key]
        [Required]
        public int userCategoryId { get; set; }

        [Required]
        public string userCategoryName { get; set; }

        public ICollection<User> Users { get; set; }
    }
}
