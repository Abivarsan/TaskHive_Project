using TASKHIVE.Model;
namespace TASKHIVE.IRepository
{
    public interface IUserCategoryRepository : IGenericRepository<UserCategory>
    {
        Task update(UserCategory userCategory);
    }
}
