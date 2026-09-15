using TASKHIVE.Model;

namespace TASKHIVE.IRepository
{
    public interface IWorkLabelRepository : IGenericRepository<WorkLabel>
    {
            Task update(WorkLabel workLabel);
    }
}
