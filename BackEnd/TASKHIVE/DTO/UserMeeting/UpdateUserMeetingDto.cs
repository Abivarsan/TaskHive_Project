using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.DTO.UserMeeting
{
    public class UpdateUserMeetingDto
    {

        [Key]
        public int userMeetingId { get; set; }

        [Required]
        public int userId { get; set; }

        [Required]
        public int meetingId { get; set; }
    }
}
