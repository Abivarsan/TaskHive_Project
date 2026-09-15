using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.DTO.WorkLabel
{
    public class GetAllWorkLabelDto
    {
        public int workLabelId { get; set; }
        public int workId { get; set; }
        public int labelId { get; set; }
    }
}
