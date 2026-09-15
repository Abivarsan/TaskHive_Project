using TASKHIVE.Model;

namespace TASKHIVE.IRepository
{
    public interface IMeetingRepository : IGenericRepository<Meeting>
    {
        Task update(Meeting entity);
    }
}
