using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.DTO.Meeting
{
    public class CreateMeetingDto
    {
        [Key]
        [Required]
        public int meetingId { get; set; }

        [Required]
        public DateTime scheduledDate { get; set; }

        [Required]
        public string meetingLink { get; set; }
    }
}
