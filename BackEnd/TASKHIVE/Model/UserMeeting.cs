using System.ComponentModel.DataAnnotations;

namespace TASKHIVE.Model
{
    public class UserMeeting
    {
        [Key]
        public int userMeetingId {  get; set; }



        [Required]
        public int userId { get; set; }
        public User User { get; set; }

        [Required]
        public int meetingId { get; set; }
        public Meeting Meeting { get; set; }
    }
}
