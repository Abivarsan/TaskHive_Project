using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.Model
{
    public class WorkLabel
    {
        [Key]
        public int workLabelId { get; set; }

        [Required]
        public int workId { get; set; }
        public Work Work { get; set; }

        [Required]

        public int labelId { get; set; }
        public Label Label { get; set; }
    }
}
