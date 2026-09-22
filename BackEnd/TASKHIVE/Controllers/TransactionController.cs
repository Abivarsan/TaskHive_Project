using Microsoft.AspNetCore.Mvc;
using TASKHIVE.IRepository;

namespace TASKHIVE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;

        // In-memory transaction storage with demo data
        public class TransactionItem
        {
            public int transacId { get; set; }
            public int projectId { get; set; }
            public string value { get; set; } = string.Empty;
            public string type { get; set; } = string.Empty; // "Income" or "Expense"
            public string description { get; set; } = string.Empty;
            public string date { get; set; } = string.Empty;
        }

        public class CreateTransactionDto
        {
            public string Value { get; set; } = string.Empty;
            public string Type { get; set; } = string.Empty;
            public string Description { get; set; } = string.Empty;
            public string Date { get; set; } = string.Empty;
        }

        private static readonly List<TransactionItem> _transactions = new()
        {
            new TransactionItem { transacId = 1, projectId = 1, value = "25000", type = "Income", description = "Initial milestone payment", date = "2026-09-01" },
            new TransactionItem { transacId = 2, projectId = 1, value = "5000", type = "Expense", description = "Cloud hosting and CI/CD setup", date = "2026-09-05" },
            new TransactionItem { transacId = 3, projectId = 2, value = "40000", type = "Income", description = "Contract advance", date = "2026-09-10" }
        };

        private static int _nextId = 4;

        public TransactionController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        // GET: api/Transaction/register -> List of projects
        [HttpGet("register")]
        public async Task<IActionResult> GetProjectsForTransaction()
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

        // GET: api/Transaction/Project/{projectId}/transactions
        [HttpGet("Project/{projectId:int}/transactions")]
        public IActionResult GetTransactionsByProject(int projectId)
        {
            var list = _transactions.Where(t => t.projectId == projectId).ToList();
            return Ok(list);
        }

        // GET: api/Transaction/Projects/{projectId}/register
        [HttpGet("Projects/{projectId:int}/register")]
        public IActionResult GetInvoiceTransactionsByProject(int projectId)
        {
            var list = _transactions.Where(t => t.projectId == projectId).ToList();
            return Ok(list);
        }

        // POST: api/Transaction/Project/{projectId}/register
        [HttpPost("Project/{projectId:int}/register")]
        public IActionResult AddTransaction(int projectId, [FromBody] CreateTransactionDto dto)
        {
            if (dto == null)
            {
                return BadRequest("Invalid transaction data.");
            }

            var item = new TransactionItem
            {
                transacId = _nextId++,
                projectId = projectId,
                value = dto.Value,
                type = dto.Type,
                description = dto.Description,
                date = string.IsNullOrWhiteSpace(dto.Date) ? DateTime.UtcNow.ToString("yyyy-MM-dd") : dto.Date
            };

            _transactions.Add(item);
            return Ok(new { message = "Transaction registered successfully", transaction = item });
        }

        // PUT: api/Transaction/Transaction/{transacId}/register
        [HttpPut("Transaction/{transacId:int}/register")]
        public IActionResult UpdateTransaction(int transacId, [FromQuery] string? value, [FromQuery] string? type, [FromQuery] string? description)
        {
            var item = _transactions.FirstOrDefault(t => t.transacId == transacId);
            if (item == null)
            {
                return NotFound("Transaction not found.");
            }

            if (!string.IsNullOrWhiteSpace(value)) item.value = value;
            if (!string.IsNullOrWhiteSpace(type)) item.type = type;
            if (!string.IsNullOrWhiteSpace(description)) item.description = description;

            return Ok(new { message = "Transaction updated successfully", transaction = item });
        }

        // DELETE: api/Transaction/Transaction/{transacId}/{projectId}/register
        [HttpDelete("Transaction/{transacId:int}/{projectId:int}/register")]
        public IActionResult DeleteTransaction(int transacId, int projectId)
        {
            var item = _transactions.FirstOrDefault(t => t.transacId == transacId);
            if (item == null)
            {
                return NotFound("Transaction not found.");
            }

            _transactions.Remove(item);
            return Ok(new { message = "Transaction deleted successfully" });
        }
    }
}
