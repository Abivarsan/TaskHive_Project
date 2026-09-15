using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.DTO.UserWork
{
    public class GetAllUserWorkDto
    {
        public int userWorkId { get; set; }
        public int userId { get; set; }
        public int workId { get; set; }
    }
}
