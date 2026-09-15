using TASKHIVE.Model;

namespace TASKHIVE.IRepository
{
    public interface ILabelRepository : IGenericRepository<Label>
    {
        Task update(Label label);
    }
}
