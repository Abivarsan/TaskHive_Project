using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TASKHIVE.DTO.Category;
using TASKHIVE.DTO.Label;
using TASKHIVE.IRepository;
using TASKHIVE.Model;

namespace TASKHIVE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LabelController : ControllerBase
    {
        private readonly ILabelRepository _labelRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<LabelController> _logger;
        public LabelController(ILabelRepository labelRepository, IMapper mapper, ILogger<LabelController> logger)
        {
            _labelRepository = labelRepository;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]

        public async Task<ActionResult<CreateLabelDto>> Create([FromBody] CreateLabelDto labelDto)
        {
            var result = _labelRepository.IsRecordExists(x => x.labelName == labelDto.labelName);

            if (result)
            {
                return Conflict("Label already exists");
            }
            var label = _mapper.Map<Label>(labelDto);

            await _labelRepository.create(label);

            return CreatedAtAction("GetById", new { id = label.labelId }, label);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<IEnumerable<GetAllLabelDto>>> GetAll()
        {
            var labels = await _labelRepository.GetAll();

            var labelsDto = _mapper.Map<List<GetAllLabelDto>>(labels);

            if (labels == null)
            {
                return NoContent();
            }

            return Ok(labelsDto);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<GetLabelByIdDto>> GetById(int id)
        {
            var label = await _labelRepository.Get(id);



            if (label == null)
            {
                _logger.LogError($"Error while try to get record id: {id}");
                return NoContent();
            }
            var labelDto = _mapper.Map<GetLabelByIdDto>(label);

            return Ok(labelDto);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Label>> Update(int id, [FromBody] UpdateLabelDto labelDto)
        {
            if (labelDto == null || id != labelDto.labelId)
            {
                return BadRequest();
            }

            var label = _mapper.Map<Label>(labelDto);

            await _labelRepository.update(label);

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult<Label>> DeleteById(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            var label = await _labelRepository.Get(id);

            if (label == null)
            {
                return NotFound();
            }

            await _labelRepository.delete(label);
            return NoContent();
        }
    }
}

