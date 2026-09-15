using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.Model
{
    public class Report
    {
        [Key]
        [Required]
        public int reportId { get; set; }

        [Required]
        public DateTime reportDate { get; set; }

        [Required]
        public string reportContent { get; set; }


        [Required]
        public int userId { get; set; }
        public User User { get; set; }
    }
}
