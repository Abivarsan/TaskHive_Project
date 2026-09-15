using TASKHIVE.Data;
using TASKHIVE.IRepository;
using TASKHIVE.Model;

namespace TASKHIVE.Repository
{
    public class WorkLabelRepository : GenericRepository<WorkLabel> , IWorkLabelRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public WorkLabelRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task update(WorkLabel entity)
        {
            _dbContext.WorkLabels.Update(entity);
            await _dbContext.SaveChangesAsync();
        }
    }
}
