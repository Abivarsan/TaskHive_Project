using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.DTO.Meeting
{
    public class GetAllMeetingDto
    {
        public int meetingId { get; set; }
        public DateTime scheduledDate { get; set; }
        public string meetingLink { get; set; }
    }
}
