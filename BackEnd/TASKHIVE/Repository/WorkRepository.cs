using TASKHIVE.Data;
using TASKHIVE.IRepository;
using TASKHIVE.Model;

namespace TASKHIVE.Repository
{
    public class WorkRepository : GenericRepository<Work> , IWorkRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public WorkRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task update(Work entity)
        {
            _dbContext.Works.Update(entity);
            await _dbContext.SaveChangesAsync();
        }
    }
}
