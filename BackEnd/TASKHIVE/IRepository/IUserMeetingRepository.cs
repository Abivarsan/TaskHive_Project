using TASKHIVE.Model;

namespace TASKHIVE.IRepository
{
    public interface IUserMeetingRepository : IGenericRepository<UserMeeting>
    {
        Task update(UserMeeting userMeeting);
    }
}
