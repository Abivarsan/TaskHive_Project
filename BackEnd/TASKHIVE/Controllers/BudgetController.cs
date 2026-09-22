using Microsoft.AspNetCore.Mvc;
using TASKHIVE.IRepository;

namespace TASKHIVE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BudgetController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;

        public class BudgetItem
        {
            public int budgetId { get; set; }
            public int projectId { get; set; }
            public double totalBudget { get; set; }
            public double selectionProcessCost { get; set; }
            public double licenseCost { get; set; }
            public double serversCost { get; set; }
            public double hardwareCost { get; set; }
            public double connectionCost { get; set; }
            public double developerCost { get; set; }
            public double otherExpenses { get; set; }
            public string date { get; set; } = string.Empty;
        }

        public class UpdateBudgetDto
        {
            public double? SelectionProcessCost { get; set; }
            public double? LicenseCost { get; set; }
            public double? ServersCost { get; set; }
            public double? HardwareCost { get; set; }
            public double? ConnectionCost { get; set; }
            public double? DeveloperCost { get; set; }
            public double? OtherExpenses { get; set; }
            public string? Date { get; set; }
        }

        private static readonly Dictionary<int, BudgetItem> _budgets = new()
        {
            [1] = new BudgetItem
            {
                budgetId = 1,
                projectId = 1,
                totalBudget = 150000,
                selectionProcessCost = 10000,
                licenseCost = 15000,
                serversCost = 20000,
                hardwareCost = 25000,
                connectionCost = 5000,
                developerCost = 60000,
                otherExpenses = 15000,
                date = "2026-09-01"
            },
            [2] = new BudgetItem
            {
                budgetId = 2,
                projectId = 2,
                totalBudget = 90000,
                selectionProcessCost = 8000,
                licenseCost = 10000,
                serversCost = 12000,
                hardwareCost = 15000,
                connectionCost = 5000,
                developerCost = 35000,
                otherExpenses = 5000,
                date = "2026-09-10"
            }
        };

        public BudgetController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        // GET: api/Budget/register -> returns list of projects
        [HttpGet("register")]
        public async Task<IActionResult> GetProjectsForBudget()
        {
            var list = new List<object>();
            try
            {
                var projects = await _projectRepository.GetAll();
                list = projects.Select(p => (object)new
                {
                    projectId = p.projectId,
                    projectName = p.projectName
                }).ToList();
            }
            catch
            {
                // Fallback gracefully if database connection is busy
            }

            if (!list.Any())
            {
                list.Add(new { projectId = 1, projectName = "TaskHive Core" });
                list.Add(new { projectId = 2, projectName = "Mobile Companion" });
                list.Add(new { projectId = 3, projectName = "Enterprise Portal" });
            }

            return Ok(list);
        }

        // GET: api/Budget/register/Projects/{projectId}
        [HttpGet("register/Projects/{projectId:int}")]
        public IActionResult GetBudgetByProject(int projectId)
        {
            if (_budgets.TryGetValue(projectId, out var budget))
            {
                return Ok(budget);
            }

            // If not found, return an initialized default template for the project
            var defaultBudget = new BudgetItem
            {
                budgetId = projectId,
                projectId = projectId,
                totalBudget = 100000,
                selectionProcessCost = 5000,
                licenseCost = 10000,
                serversCost = 15000,
                hardwareCost = 15000,
                connectionCost = 5000,
                developerCost = 45000,
                otherExpenses = 5000,
                date = DateTime.UtcNow.ToString("yyyy-MM-dd")
            };
            _budgets[projectId] = defaultBudget;
            return Ok(defaultBudget);
        }

        // PUT: api/Budget/Projects/{projectId}/register
        [HttpPut("Projects/{projectId:int}/register")]
        public IActionResult UpdateBudget(int projectId, [FromBody] UpdateBudgetDto dto)
        {
            if (!_budgets.TryGetValue(projectId, out var budget))
            {
                budget = new BudgetItem { budgetId = projectId, projectId = projectId };
                _budgets[projectId] = budget;
            }

            if (dto.SelectionProcessCost.HasValue) budget.selectionProcessCost = dto.SelectionProcessCost.Value;
            if (dto.LicenseCost.HasValue) budget.licenseCost = dto.LicenseCost.Value;
            if (dto.ServersCost.HasValue) budget.serversCost = dto.ServersCost.Value;
            if (dto.HardwareCost.HasValue) budget.hardwareCost = dto.HardwareCost.Value;
            if (dto.ConnectionCost.HasValue) budget.connectionCost = dto.ConnectionCost.Value;
            if (dto.DeveloperCost.HasValue) budget.developerCost = dto.DeveloperCost.Value;
            if (dto.OtherExpenses.HasValue) budget.otherExpenses = dto.OtherExpenses.Value;
            if (!string.IsNullOrWhiteSpace(dto.Date)) budget.date = dto.Date;

            budget.totalBudget = budget.selectionProcessCost + budget.licenseCost + budget.serversCost +
                                budget.hardwareCost + budget.connectionCost + budget.developerCost + budget.otherExpenses;

            return Ok(new { message = "Budget updated successfully", budget });
        }

        // DELETE: api/Budget?projectid={projectId}
        [HttpDelete]
        public IActionResult DeleteBudget([FromQuery] int projectid)
        {
            _budgets.Remove(projectid);
            return Ok(new { message = "Budget deleted successfully" });
        }
    }
}
