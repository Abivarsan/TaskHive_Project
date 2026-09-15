using TASKHIVE.Model;

namespace TASKHIVE.IRepository
{
    public interface IReportRepository : IGenericRepository<Report>
    {
        Task update(Report report);

    }
}
