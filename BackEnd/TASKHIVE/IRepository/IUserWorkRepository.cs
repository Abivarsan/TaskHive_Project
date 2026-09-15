using TASKHIVE.Model;

namespace TASKHIVE.IRepository
{
    public interface IUserWorkRepository : IGenericRepository<UserWork>
    {
        Task update(UserWork userWork);
    }
}
