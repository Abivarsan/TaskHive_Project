using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.DTO.Role
{
    public class CreateRoleDto
    {
        [Key]
        [Required]
        public int roleId { get; set; }
        public string roleName { get; set; }
    }
}
