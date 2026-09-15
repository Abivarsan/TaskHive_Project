using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.Model
{
    public class TimeLog
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
        public User User { get; set; }

        [Required]
        public int workId { get; set; }
        public Work Work { get; set; }
    }

}
