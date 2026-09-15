using System.ComponentModel.DataAnnotations;
using TASKHIVE.Model;

namespace TASKHIVE.DTO.Label
{
    public class UpdateLabelDto
    {
        [Key]
        public int labelId { get; set; }

        [Required]
        public addLabel lableName { get; set; }
    }
}
