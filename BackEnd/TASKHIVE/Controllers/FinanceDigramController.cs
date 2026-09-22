using Microsoft.AspNetCore.Mvc;

namespace TASKHIVE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FinanceDigramController : ControllerBase
    {
        // GET: api/FinanceDigram/Projects/{projectId}/register
        [HttpGet("Projects/{projectId:int}/register")]
        public IActionResult GetProjectFinanceDiagram(int projectId)
        {
            return Ok(new
            {
                remaining = 45000,
                used = 75000
            });
        }
    }

    [Route("api/TotalIncomeExpence")]
    [ApiController]
    public class TotalIncomeExpenseController : ControllerBase
    {
        // GET: api/TotalIncomeExpence?year=2026
        [HttpGet]
        public IActionResult GetYearlyIncomeExpense([FromQuery] string? year)
        {
            // Monthly income vs expense data formatted for Recharts in TotalFinanceDigram.jsx
            // Note: TotalFinanceDigram expects 'expence' spelling
            var monthlyData = new[]
            {
                new { income = 45000, expence = 18000 }, // Jan
                new { income = 52000, expence = 21000 }, // Feb
                new { income = 48000, expence = 19500 }, // Mar
                new { income = 61000, expence = 25000 }, // Apr
                new { income = 55000, expence = 22000 }, // May
                new { income = 67000, expence = 28000 }, // June
                new { income = 72000, expence = 31000 }, // July
                new { income = 69000, expence = 29000 }, // Aug
                new { income = 75000, expence = 32000 }, // Sept
                new { income = 80000, expence = 35000 }, // Oct
                new { income = 77000, expence = 33000 }, // Nov
                new { income = 85000, expence = 36000 }  // Dec
            };

            return Ok(monthlyData);
        }
    }
}
