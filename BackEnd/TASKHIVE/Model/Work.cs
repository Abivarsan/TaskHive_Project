using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.Model
{
    public enum WorkStatus
    {
        ToDo,
        InProgress,
        Completed
    }

    public enum WorkPriority
    {
        Low,
        Medium,
        High
    }

    public class Work
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

        [Required]
        public WorkStatus workStatus { get; set; } = WorkStatus.ToDo; // ToDo, InProgress, Completed 

        public int categoryId { get; set; }
        public Category Category { get; set; } // Task Category

        [Required]
        public int projectId { get; set; }
        public Project Project { get; set; }

        public ICollection<WorkLabel> WorkLabels { get; set; }
        public ICollection<UserWork> UserWorks { get; set; }
        public ICollection<TimeLog> TimeLogs { get; set; }
    }
}
