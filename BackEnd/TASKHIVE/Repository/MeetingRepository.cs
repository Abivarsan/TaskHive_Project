using TASKHIVE.Data;
using TASKHIVE.IRepository;
using TASKHIVE.Model;

namespace TASKHIVE.Repository
{
    public class MeetingRepository : GenericRepository<Meeting> , IMeetingRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public MeetingRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task update(Meeting entity)
        {
            _dbContext.Meetings.Update(entity);
            await _dbContext.SaveChangesAsync();
        }
    }

}

