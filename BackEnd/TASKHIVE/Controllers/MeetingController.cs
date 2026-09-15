using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TASKHIVE.DTO.Category;
using TASKHIVE.DTO.Meeting;
using TASKHIVE.IRepository;
using TASKHIVE.Model;

namespace TASKHIVE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeetingController : ControllerBase
    {
        private readonly IMeetingRepository _meetingRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<MeetingController> _logger;
        public MeetingController(IMeetingRepository meetingRepository, IMapper mapper, ILogger<MeetingController> logger)
        {
            _meetingRepository = meetingRepository;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]

        public async Task<ActionResult<CreateMeetingDto>> Create([FromBody] CreateMeetingDto meetingDto)
        {
            var result = _meetingRepository.IsRecordExists(x => x.scheduledDate == meetingDto.scheduledDate);

            if (result)
            {
                return Conflict("Schedule Date already exists");
            }
            var meeting = _mapper.Map<Meeting>(meetingDto);

            await _meetingRepository.create(meeting);

            return CreatedAtAction("GetById", new { id = meeting.meetingId }, meeting);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<IEnumerable<GetAllMeetingDto>>> GetAll()
        {
            var meetings = await _meetingRepository.GetAll();

            var meetingsDto = _mapper.Map<List<GetAllMeetingDto>>(meetings);

            if (meetings == null)
            {
                return NoContent();
            }

            return Ok(meetingsDto);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<GetMeetingByIdDto>> GetById(int id)
        {
            var meeting = await _meetingRepository.Get(id);



            if (meeting == null)
            {
                _logger.LogError($"Error while try to get record id: {id}");
                return NoContent();
            }
            var meetingDto = _mapper.Map<GetMeetingByIdDto>(meeting);

            return Ok(meetingDto);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Meeting>> Update(int id, [FromBody] UpdateMeetingDto meetingDto)
        {
            if (meetingDto == null || id != meetingDto.meetingId)
            {
                return BadRequest();
            }

            var meeting = _mapper.Map<Meeting>(meetingDto);

            await _meetingRepository.update(meeting);

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult<Meeting>> DeleteById(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            var meeting = await _meetingRepository.Get(id);

            if (meeting == null)
            {
                return NotFound();
            }

            await _meetingRepository.delete(meeting);
            return NoContent();
        }
    }
}

