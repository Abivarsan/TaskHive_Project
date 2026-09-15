using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.Model
{
    public class Role
    {
        [Key]
        [Required]
        public int roleId { get; set; }

        [Required]
        public string roleName { get; set; }

        public ICollection<User> Users { get; set; }
    }
}
