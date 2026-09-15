using TASKHIVE.Data;
using TASKHIVE.IRepository;
using TASKHIVE.Model;

namespace TASKHIVE.Repository
{
    public class ReportRepository : GenericRepository<Report> , IReportRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public ReportRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task update(Report entity)
        {
            _dbContext.Reports.Update(entity);
            await _dbContext.SaveChangesAsync();
        }
    }
}

