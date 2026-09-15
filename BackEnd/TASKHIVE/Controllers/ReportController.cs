using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TASKHIVE.DTO.Category;
using TASKHIVE.DTO.Report;
using TASKHIVE.IRepository;
using TASKHIVE.Model;

namespace TASKHIVE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IReportRepository _reportRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<ReportController> _logger;
        private readonly ICategoryRepository _categoryRepository;
        public ReportController(IReportRepository reportRepository, IMapper mapper, ILogger<ReportController> logger)
        {
            _reportRepository = reportRepository;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]

        public async Task<ActionResult<CreateReportDto>> Create([FromBody] CreateReportDto reportDto)
        {
            var result = _reportRepository.IsRecordExists(x => x.reportContent == reportDto.reportContent);

            if (result)
            {
                return Conflict("report content already exists");
            }
            var report = _mapper.Map<Report>(reportDto);

            await _reportRepository.create(report);

            return CreatedAtAction("GetById", new { id = report.reportId }, report);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<IEnumerable<GetAllReportDto>>> GetAll()
        {
            var reports = await _reportRepository.GetAll();

            var reportsDto = _mapper.Map<List<GetAllReportDto>>(reports);

            if (reports == null)
            {
                return NoContent();
            }

            return Ok(reportsDto);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<GetReportByIdDto>> GetById(int id)
        {
            var report = await _reportRepository.Get(id);



            if (report == null)
            {
                _logger.LogError($"Error while try to get record id: {id}");
                return NoContent();
            }
            var reportDto = _mapper.Map<GetReportByIdDto>(report);

            return Ok(reportDto);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Report>> Update(int id, [FromBody] UpdateReportDto reportDto)
        {
            if (reportDto == null || id != reportDto.reportId)
            {
                return BadRequest();
            }

            var report = _mapper.Map<Report>(reportDto);

            await _reportRepository.update(report);

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult<Category>> DeleteById(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            var category = await _categoryRepository.Get(id);

            if (category == null)
            {
                return NotFound();
            }

            await _categoryRepository.delete(category);
            return NoContent();
        }
    }
}
