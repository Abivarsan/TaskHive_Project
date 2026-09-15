using System.ComponentModel.DataAnnotations;
using TASKHIVE.Model;

namespace TASKHIVE.DTO.Work
{
    public class UpdateWorkDto
    {
        [Key]
        [Required]
        public int workId { get; set; }

        [Required]
        public string workName { get; set; }

        [Required]
        public string description { get; set; }

        [Required]
        public DateTime duedate { get; set; }


        public WorkPriority workPriority { get; set; } // Low, Medium, High

        public WorkStatus workStatus { get; set; } = WorkStatus.ToDo; // ToDo, InProgress, Completed 

        public int categoryId { get; set; }

        [Required]
        public int projectId { get; set; }
    }
}
