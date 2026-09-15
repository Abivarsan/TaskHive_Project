namespace TASKHIVE.DTO.Report
{
    public class GetAllReportDto
    {
        public int reportId { get; set; }
        public DateTime reportDate { get; set; }
        public string reportContent { get; set; }
        public int userId { get; set; }
    }
}
