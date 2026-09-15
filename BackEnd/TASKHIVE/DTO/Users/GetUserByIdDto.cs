using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.DTO.Users
{
    public class GetUserByIdDto
    {
        public int userId { get; set; }

        public string userName { get; set; }

        public string email { get; set; }

        public string password { get; set; }
        public int roleId { get; set; }
    }
}
