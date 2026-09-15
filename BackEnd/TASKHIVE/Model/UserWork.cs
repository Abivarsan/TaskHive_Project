using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Metrics;

namespace TASKHIVE.Model
{
    public class UserWork
    {
        [Key]
        [Required]
        public int userWorkId { get; set; }

        [Required]
        public int userId { get; set; }
        public User User { get; set; }

        [Required]
        public int workId { get; set; }
        public Work Work { get; set; }
       
    }
}
