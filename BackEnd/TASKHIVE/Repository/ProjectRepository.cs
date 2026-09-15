using TASKHIVE.Data;
using TASKHIVE.IRepository;
using TASKHIVE.Model;

namespace TASKHIVE.Repository
{
    public class ProjectRepository : GenericRepository<Project> , IProjectRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public ProjectRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task update(Project entity)
        {
            _dbContext.Projects.Update(entity);
            await _dbContext.SaveChangesAsync();
        }
    }
}

