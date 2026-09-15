using TASKHIVE.Data;
using TASKHIVE.IRepository;
using TASKHIVE.Model;

namespace TASKHIVE.Repository
{
    public class UserCategoryRepository : GenericRepository<UserCategory>, IUserCategoryRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public UserCategoryRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task update(UserCategory entity)
        {
            _dbContext.UserCategories.Update(entity);
            await _dbContext.SaveChangesAsync();
        }
    }
}
