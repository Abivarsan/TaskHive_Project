using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TASKHIVE.DTO.UserMeeting;
using TASKHIVE.IRepository;
using TASKHIVE.Model;

namespace TASKHIVE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserMeetingController : ControllerBase
    {
        private readonly IUserMeetingRepository _userMeetingRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<UserMeetingController> _logger;

        public UserMeetingController(IUserMeetingRepository userMeetingRepository, IMapper mapper, ILogger<UserMeetingController> logger)
        {
            _userMeetingRepository = userMeetingRepository;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<CreateUserMeetingDto>> Create([FromBody] CreateUserMeetingDto dto)
        {
            var entity = _mapper.Map<UserMeeting>(dto);
            await _userMeetingRepository.create(entity);

            return CreatedAtAction("GetById", new { id = entity.userMeetingId }, entity);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<GetAllUserMeetingDto>>> GetAll()
        {
            var entities = await _userMeetingRepository.GetAll();
            var dtos = _mapper.Map<List<GetAllUserMeetingDto>>(entities);

            return Ok(dtos);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<GetUserMeetingDto>> GetById(int id)
        {
            var entity = await _userMeetingRepository.Get(id);
            if (entity == null)
            {
                return NotFound();
            }

            var dto = _mapper.Map<GetUserMeetingDto>(entity);
            return Ok(dto);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Update(int id, [FromBody] UpdateUserMeetingDto dto)
        {
            if (dto == null || id != dto.userMeetingId)
            {
                return BadRequest();
            }

            var entity = _mapper.Map<UserMeeting>(dto);
            await _userMeetingRepository.update(entity);

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

            var entity = await _userMeetingRepository.Get(id);
            if (entity == null)
            {
                return NotFound();
            }

            await _userMeetingRepository.delete(entity);
            return NoContent();
        }
    }
}
