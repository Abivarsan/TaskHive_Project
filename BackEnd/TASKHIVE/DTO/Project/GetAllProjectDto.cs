using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.DTO.Project
{
    public class GetAllProjectDto
    {
        public int projectId { get; set; }
        public string projectName { get; set; }
    }
}
