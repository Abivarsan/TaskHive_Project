using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.DTO.UserMeeting
{
    public class GetAllUserMeetingDto
    {
        public int userMeetingId { get; set; }
        public int userId { get; set; }
        public int meetingId { get; set; }
    }
}
