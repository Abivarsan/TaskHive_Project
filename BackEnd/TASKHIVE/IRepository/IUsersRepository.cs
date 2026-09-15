using TASKHIVE.Model;

namespace TASKHIVE.IRepository
{
    public interface IUsersRepository : IGenericRepository<User>
    {
        Task update(User users);
    }
}
