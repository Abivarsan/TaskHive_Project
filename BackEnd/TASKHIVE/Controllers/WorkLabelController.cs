using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TASKHIVE.DTO.WorkLabel;
using TASKHIVE.IRepository;
using TASKHIVE.Model;

namespace TASKHIVE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkLabelController : ControllerBase
    {
        private readonly IWorkLabelRepository _workLabelRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<WorkLabelController> _logger;

        public WorkLabelController(IWorkLabelRepository workLabelRepository, IMapper mapper, ILogger<WorkLabelController> logger)
        {
            _workLabelRepository = workLabelRepository;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<CreateWorkLabelDto>> Create([FromBody] CreateWorkLabelDto dto)
        {
            var entity = _mapper.Map<WorkLabel>(dto);
            await _workLabelRepository.create(entity);

            return CreatedAtAction("GetById", new { id = entity.workLabelId }, entity);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<GetAllWorkLabelDto>>> GetAll()
        {
            var entities = await _workLabelRepository.GetAll();
            var dtos = _mapper.Map<List<GetAllWorkLabelDto>>(entities);

            return Ok(dtos);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<GetWorkLabelByIdDto>> GetById(int id)
        {
            var entity = await _workLabelRepository.Get(id);
            if (entity == null)
            {
                return NotFound();
            }

            var dto = _mapper.Map<GetWorkLabelByIdDto>(entity);
            return Ok(dto);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Update(int id, [FromBody] UpdateWorkLabelDto dto)
        {
            if (dto == null || id != dto.workLabelId)
            {
                return BadRequest();
            }

            var entity = _mapper.Map<WorkLabel>(dto);
            await _workLabelRepository.update(entity);

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

            var entity = await _workLabelRepository.Get(id);
            if (entity == null)
            {
                return NotFound();
            }

            await _workLabelRepository.delete(entity);
            return NoContent();
        }
    }
}
