using System.Diagnostics.Metrics;
using TASKHIVE.Data;
using TASKHIVE.IRepository;
using TASKHIVE.Model;

namespace TASKHIVE.Repository
{
    public class RoleRepository : GenericRepository<Role>, IRoleRepository 
    {
        private readonly ApplicationDbContext _dbContext;

        public RoleRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task update(Role entity)
        {
            _dbContext.Roles.Update(entity);
            await _dbContext.SaveChangesAsync();
        }
    }
}
