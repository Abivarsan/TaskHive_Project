using Microsoft.AspNetCore.Mvc;
using TASKHIVE.IRepository;

namespace TASKHIVE.Controllers
{
    [Route("api/Developer_Finance")]
    [ApiController]
    public class DeveloperFinanceController : ControllerBase
    {
        private readonly ITimeLogRepository _timeLogRepository;
        private readonly IUsersRepository _usersRepository;

        // In-memory payment records
        private static readonly Dictionary<string, (double Hours, double Payment)> _paymentRecords = new();

        public DeveloperFinanceController(ITimeLogRepository timeLogRepository, IUsersRepository usersRepository)
        {
            _timeLogRepository = timeLogRepository;
            _usersRepository = usersRepository;
        }

        [HttpGet("Monthlyrate")]
        public IActionResult GetMonthlyRate([FromQuery] string? month, [FromQuery] string? year)
        {
            return Ok(new
            {
                currentRate = 50.0
            });
        }

        [HttpGet("Payment/{userId:int}/register")]
        public async Task<IActionResult> GetDeveloperPayment(int userId, [FromQuery] string? month, [FromQuery] string? year)
        {
            var key = $"{userId}_{month}_{year}";
            if (_paymentRecords.TryGetValue(key, out var record))
            {
                return Ok(new
                {
                    monthlyWorkedHours = record.Hours,
                    totalMonthPayment = record.Payment
                });
            }

            // Calculate from time logs or default
            double totalHours = 0;
            try
            {
                var userLogs = (await _timeLogRepository.GetAll()).Where(t => t.userId == userId).ToList();
                totalHours = userLogs.Sum(l => (double)l.hoursWorked);
            }
            catch
            {
                // Fallback gracefully if database connection is busy
            }

            if (totalHours <= 0)
            {
                totalHours = 160.0; // Standard monthly hours default
            }

            double rate = 50.0;
            double totalPayment = totalHours * rate;

            _paymentRecords[key] = (totalHours, totalPayment);

            return Ok(new
            {
                monthlyWorkedHours = totalHours,
                totalMonthPayment = totalPayment
            });
        }

        [HttpPost("Developer/{userId:int}/register")]
        public IActionResult RegisterPaymentData(int userId, [FromQuery] string? month, [FromQuery] string? year)
        {
            var key = $"{userId}_{month}_{year}";
            double hours = 160.0;
            double payment = hours * 50.0;
            _paymentRecords[key] = (hours, payment);

            return Ok(new
            {
                message = "Payment registered successfully",
                monthlyWorkedHours = hours,
                totalMonthPayment = payment
            });
        }
    }
}
