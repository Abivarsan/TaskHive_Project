using TASKHIVE.Model;

namespace TASKHIVE.DTO.Work
{
    public class GetWorkById
    {
        public int workId { get; set; }
        public string workName { get; set; }
        public string description { get; set; }
        public DateTime duedate { get; set; }
        public WorkPriority workPriority { get; set; } // Low, Medium, High
        public WorkStatus workStatus { get; set; } = WorkStatus.ToDo; // ToDo, InProgress, Completed 
        public int categoryId { get; set; }
        public int projectId { get; set; }
    }
}
