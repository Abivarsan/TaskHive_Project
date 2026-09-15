using System.ComponentModel.DataAnnotations;
using TASKHIVE.Model;

namespace TASKHIVE.DTO.Users
{
    public class GetAllUserDto
    {
        public int userId { get; set; }

        public string userName { get; set; }

        public string email { get; set; }

        public string password { get; set; }
        public int roleId { get; set; }
    }
}
