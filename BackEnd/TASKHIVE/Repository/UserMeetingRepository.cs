using TASKHIVE.Data;
using TASKHIVE.IRepository;
using TASKHIVE.Model;

namespace TASKHIVE.Repository
{
    public class UserMeetingRepository : GenericRepository<UserMeeting> , IUserMeetingRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public UserMeetingRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task update(UserMeeting entity)
        {
            _dbContext.UserMeetings.Update(entity);
            await _dbContext.SaveChangesAsync();
        }
    }
}

