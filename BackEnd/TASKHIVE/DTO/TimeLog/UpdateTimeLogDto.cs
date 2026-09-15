using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.DTO.TimeLog
{
    public class UpdateTimeLogDto
    {
        [Key]
        [Required]
        public int timelogId { get; set; }

        [Required]
        public DateTime logDate { get; set; }

        [Required]
        public int hoursWorked { get; set; }

        [Required]
        public int userId { get; set; }

        [Required]
        public int workId { get; set; }
    }
}
