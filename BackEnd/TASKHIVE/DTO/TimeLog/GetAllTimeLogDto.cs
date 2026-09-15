using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.DTO.TimeLog
{
    public class GetAllTimeLogDto
    {
        public int timelogId { get; set; }
        public DateTime logDate { get; set; }
        public int hoursWorked { get; set; }
        public int userId { get; set; }
        public int workId { get; set; }
    }
}
