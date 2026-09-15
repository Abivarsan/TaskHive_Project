using TASKHIVE.Data;
using TASKHIVE.IRepository;
using TASKHIVE.Model;

namespace TASKHIVE.Repository
{
   
        public class UsersRepository : GenericRepository<User>, IUsersRepository
        {
            private readonly ApplicationDbContext _dbContext;

            public UsersRepository(ApplicationDbContext dbContext) : base(dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task update(User entity)
            {
                _dbContext.Users.Update(entity);
                await _dbContext.SaveChangesAsync();
            }
        }
    
}
