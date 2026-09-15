using System.Linq.Expressions;

namespace TASKHIVE.IRepository
{
    public interface  IGenericRepository<T> where T : class
    {
        Task<List<T>> GetAll();
        Task<T> Get(int id);
        Task create(T entity);
        Task delete(T entity);
        Task save();
        bool IsRecordExists(Expression<Func<T, bool>> condtion);
    }
}
