using TASKHIVE.Data;
using TASKHIVE.IRepository;
using TASKHIVE.Model;

namespace TASKHIVE.Repository
{
    public class LabelRepository : GenericRepository<Label> , ILabelRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public LabelRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task update(Label entity)
        {
            _dbContext.Labels.Update(entity);
            await _dbContext.SaveChangesAsync();
        }
    }
}
