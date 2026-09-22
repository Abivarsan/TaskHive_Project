using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TASKHIVE.DTO.UserWork;
using TASKHIVE.IRepository;
using TASKHIVE.Model;

namespace TASKHIVE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserWorkController : ControllerBase
    {
        private readonly IUserWorkRepository _userWorkRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<UserWorkController> _logger;

        public UserWorkController(IUserWorkRepository userWorkRepository, IMapper mapper, ILogger<UserWorkController> logger)
        {
            _userWorkRepository = userWorkRepository;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<CreateUserWorkDto>> Create([FromBody] CreateUserWorkDto dto)
        {
            var entity = _mapper.Map<UserWork>(dto);
            await _userWorkRepository.create(entity);

            return CreatedAtAction("GetById", new { id = entity.userWorkId }, entity);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<GetAllUserWorkDto>>> GetAll()
        {
            var entities = await _userWorkRepository.GetAll();
            var dtos = _mapper.Map<List<GetAllUserWorkDto>>(entities);

            return Ok(dtos);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<GetUserWorkByIdDto>> GetById(int id)
        {
            var entity = await _userWorkRepository.Get(id);
            if (entity == null)
            {
                return NotFound();
            }

            var dto = _mapper.Map<GetUserWorkByIdDto>(entity);
            return Ok(dto);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Update(int id, [FromBody] UpdateUserWorkDto dto)
        {
            if (dto == null || id != dto.userWorkId)
            {
                return BadRequest();
            }

            var entity = _mapper.Map<UserWork>(dto);
            await _userWorkRepository.update(entity);

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

            var entity = await _userWorkRepository.Get(id);
            if (entity == null)
            {
                return NotFound();
            }

            await _userWorkRepository.delete(entity);
            return NoContent();
        }
    }
}
