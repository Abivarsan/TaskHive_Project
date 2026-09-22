using Microsoft.AspNetCore.Mvc;

namespace TASKHIVE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeveloperRateController : ControllerBase
    {
        // Static in-memory store for rate settings (can also be saved to a database table)
        private static double _currentRate = 50.0;
        private static string _updatedDate = DateTime.UtcNow.ToString("yyyy-MM-dd");

        public class RateUpdateDto
        {
            public double CurrentRate { get; set; }
            public string? UpdatedDate { get; set; }
        }

        [HttpGet("register")]
        public IActionResult GetCurrentRate()
        {
            return Ok(new
            {
                currentRate = _currentRate,
                updatedDate = _updatedDate
            });
        }

        [HttpPost("register")]
        public IActionResult UpdateRate([FromBody] RateUpdateDto rateDto)
        {
            if (rateDto == null || rateDto.CurrentRate < 0)
            {
                return BadRequest("Invalid rate data provided.");
            }

            _currentRate = rateDto.CurrentRate;
            _updatedDate = string.IsNullOrWhiteSpace(rateDto.UpdatedDate)
                ? DateTime.UtcNow.ToString("yyyy-MM-dd")
                : rateDto.UpdatedDate;

            return Ok(new
            {
                message = "Rate updated successfully",
                currentRate = _currentRate,
                updatedDate = _updatedDate
            });
        }
    }
}
