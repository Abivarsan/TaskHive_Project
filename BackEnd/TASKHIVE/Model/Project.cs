using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.Model
{
    public class Project
    {
        [Key]
        [Required]
        public int projectId { get; set; }

        [Required]
        public string projectName { get; set; }

        public ICollection<Work> Works { get; set; }
    }
}
