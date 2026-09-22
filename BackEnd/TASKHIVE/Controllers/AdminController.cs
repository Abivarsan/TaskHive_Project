using Microsoft.AspNetCore.Mvc;
using TASKHIVE.IRepository;
using TASKHIVE.Model;

namespace TASKHIVE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IUsersRepository _usersRepository;
        private readonly IProjectRepository _projectRepository;

        public AdminController(IUsersRepository usersRepository, IProjectRepository projectRepository)
        {
            _usersRepository = usersRepository;
            _projectRepository = projectRepository;
        }

        [HttpGet("{userId:int}")]
        public async Task<IActionResult> GetUserProfile(int userId)
        {
            var user = await _usersRepository.Get(userId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            return Ok(new
            {
                userId = user.userId,
                userName = user.userName,
                email = user.email,
                roleId = user.roleId,
                userCategoryId = user.userCategoryId,
                profileImageUrl = ""
            });
        }

        [HttpGet("Counts")]
        public async Task<IActionResult> GetCounts()
        {
            var users = (await _usersRepository.GetAll()).ToList();
            var projects = (await _projectRepository.GetAll()).ToList();

            var totalAdmins = users.Count(u => u.userCategoryId == 1 || u.roleId == 1);
            var totalManagers = users.Count(u => u.userCategoryId == 2);
            var totalDevelopers = users.Count(u => u.userCategoryId == 3 || u.roleId == 2);
            var totalProjects = projects.Count;

            return Ok(new
            {
                totalAdmins,
                totalManagers,
                totalDevelopers,
                totalProjects,
                totalIncome = "125,000",
                totalExpense = "45,000"
            });
        }

        [HttpGet("UserList")]
        public async Task<IActionResult> GetUserList()
        {
            var users = await _usersRepository.GetAll();
            return Ok(users);
        }
    }
}
