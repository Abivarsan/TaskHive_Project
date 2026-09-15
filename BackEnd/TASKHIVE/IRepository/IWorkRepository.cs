using TASKHIVE.Model;

namespace TASKHIVE.IRepository
{
    public interface IWorkRepository : IGenericRepository<Work>

    {
        Task update(Work work);
    }
}
