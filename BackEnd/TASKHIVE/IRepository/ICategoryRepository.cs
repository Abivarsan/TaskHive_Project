using TASKHIVE.Model;

namespace TASKHIVE.IRepository
{
    public interface ICategoryRepository : IGenericRepository<Category>
    {
        Task update(Category category);
    }
}
