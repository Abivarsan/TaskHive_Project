using TASKHIVE.Model;

namespace TASKHIVE.IRepository
{
    public interface IProjectRepository : IGenericRepository<Project>
    {
        Task update(Project project);
    }
}
