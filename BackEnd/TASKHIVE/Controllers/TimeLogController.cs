using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TASKHIVE.DTO.TimeLog;
using TASKHIVE.IRepository;
using TASKHIVE.Model;

namespace TASKHIVE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeLogController : ControllerBase
    {
        private readonly ITimeLogRepository _timeLogRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<TimeLogController> _logger;

        public TimeLogController(ITimeLogRepository timeLogRepository, IMapper mapper, ILogger<TimeLogController> logger)
        {
            _timeLogRepository = timeLogRepository;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<CreateTimeLogDto>> Create([FromBody] CreateTimeLogDto timeLogDto)
        {
            var timeLog = _mapper.Map<TimeLog>(timeLogDto);
            await _timeLogRepository.create(timeLog);

            return CreatedAtAction("GetById", new { id = timeLog.timelogId }, timeLog);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<GetAllTimeLogDto>>> GetAll()
        {
            var timeLogs = await _timeLogRepository.GetAll();
            var timeLogsDto = _mapper.Map<List<GetAllTimeLogDto>>(timeLogs);

            return Ok(timeLogsDto);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<GetTimeLogByIdDto>> GetById(int id)
        {
            var timeLog = await _timeLogRepository.Get(id);
            if (timeLog == null)
            {
                _logger.LogWarning($"Record not found with id: {id}");
                return NotFound();
            }

            var timeLogDto = _mapper.Map<GetTimeLogByIdDto>(timeLog);
            return Ok(timeLogDto);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Update(int id, [FromBody] UpdateTimeLogDto timeLogDto)
        {
            if (timeLogDto == null || id != timeLogDto.timelogId)
            {
                return BadRequest();
            }

            var timeLog = _mapper.Map<TimeLog>(timeLogDto);
            await _timeLogRepository.update(timeLog);

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteById(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            var timeLog = await _timeLogRepository.Get(id);
            if (timeLog == null)
            {
                return NotFound();
            }

            await _timeLogRepository.delete(timeLog);
            return NoContent();
        }
    }
}
