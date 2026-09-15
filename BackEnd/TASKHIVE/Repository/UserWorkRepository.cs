using TASKHIVE.Data;
using TASKHIVE.IRepository;
using TASKHIVE.Model;

namespace TASKHIVE.Repository
{
    public class UserWorkRepository : GenericRepository<UserWork> , IUserWorkRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public UserWorkRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task update(UserWork entity)
        {
            _dbContext.UserWorks.Update(entity);
            await _dbContext.SaveChangesAsync();
        }
    }
}
