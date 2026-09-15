using TASKHIVE.Data;
using TASKHIVE.IRepository;
using TASKHIVE.Model;

namespace TASKHIVE.Repository
{
    public class TimeLogRepository : GenericRepository<TimeLog> , ITimeLogRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public TimeLogRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task update(TimeLog entity)
        {
            _dbContext.TimeLogs.Update(entity);
            await _dbContext.SaveChangesAsync();
        }
    }
}

