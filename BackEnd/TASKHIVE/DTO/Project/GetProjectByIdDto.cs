using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.DTO.Project
{
    public class GetProjectByIdDto
    {
        public int projectId { get; set; }
        public string projectName { get; set; }
    }
}
