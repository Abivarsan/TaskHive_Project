using System.ComponentModel.DataAnnotations;
using TASKHIVE.Model;

namespace TASKHIVE.DTO.UserMeeting
{
    public class CreateUserMeetingtDto
    {
        [Key]
        public int userMeetingId { get; set; }

        [Required]
        public int userId { get; set; }

        [Required]
        public int meetingId { get; set; }
    }
}
