using System.ComponentModel.DataAnnotations;
using TASKHIVE.Model;

namespace TASKHIVE.DTO.Report
{
    public class CreateReportDto
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
    }
}
