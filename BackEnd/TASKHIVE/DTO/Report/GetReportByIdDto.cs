using System.ComponentModel.DataAnnotations;
using TASKHIVE.Model;

namespace TASKHIVE.DTO.Report
{
    public class GetReportByIdDto
    {
        public int reportId { get; set; }
        public DateTime reportDate { get; set; }
        public string reportContent { get; set; }
        public int userId { get; set; }
    }
}
