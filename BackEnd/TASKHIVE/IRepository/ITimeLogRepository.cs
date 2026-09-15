using TASKHIVE.Model;

namespace TASKHIVE.IRepository
{
    public interface ITimeLogRepository : IGenericRepository<TimeLog>
    {
        Task update(TimeLog timeLog);
    }
}
