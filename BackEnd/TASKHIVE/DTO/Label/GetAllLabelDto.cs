using System.ComponentModel.DataAnnotations;
using TASKHIVE.Model;

namespace TASKHIVE.DTO.Label
{
    public class GetAllLabelDto
    {
        public int labelId { get; set; }
        public addLabel lableName { get; set; }

    }
}
