using System.ComponentModel.DataAnnotations;
using TASKHIVE.Model;

namespace TASKHIVE.DTO.Label
{
    public class CreateLabelDto
    {
        [Key]
        public int labelId { get; set; }

        [Required]
        public addLabel labelName { get; set; }
    }
}
