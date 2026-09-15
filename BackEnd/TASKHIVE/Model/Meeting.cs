using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.Model
{
    public class Meeting
    {
        [Key]
        [Required]
        public int meetingId { get; set; }

        [Required]
        public DateTime scheduledDate { get; set; }

        [Required]
        public string meetingLink { get; set; }

        public ICollection<UserMeeting> UserMeetings { get; set; }

    }
}
