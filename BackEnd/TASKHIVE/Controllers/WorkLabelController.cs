using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TASKHIVE.DTO.Category;
using TASKHIVE.IRepository;
using TASKHIVE.Model;

namespace TASKHIVE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkLabelController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<CategoryController> _logger;
        public WorkLabelController(ICategoryRepository categoryRepository, IMapper mapper, ILogger<CategoryController> logger)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]

        public async Task<ActionResult<CreateCategoryDto>> Create([FromBody] CreateCategoryDto categoryDto)
        {
            var result = _categoryRepository.IsRecordExists(x => x.categoryStatus == categoryDto.categoryStatus);

            if (result)
            {
                return Conflict("Category already exists");
            }
            var category = _mapper.Map<Category>(categoryDto);

            await _categoryRepository.create(category);

            return CreatedAtAction("GetById", new { id = category.categoryId }, category);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<IEnumerable<GetAllCategoryDto>>> GetAll()
        {
            var categories = await _categoryRepository.GetAll();

            var categoriesDto = _mapper.Map<List<GetAllCategoryDto>>(categories);

            if (categories == null)
            {
                return NoContent();
            }

            return Ok(categoriesDto);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<GetCategoryByIdDto>> GetById(int id)
        {
            var category = await _categoryRepository.Get(id);



            if (category == null)
            {
                _logger.LogError($"Error while try to get record id: {id}");
                return NoContent();
            }
            var categoryDto = _mapper.Map<GetCategoryByIdDto>(category);

            return Ok(categoryDto);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Category>> Update(int id, [FromBody] UpdateCategoryDto categoryDto)
        {
            if (categoryDto == null || id != categoryDto.categoryId)
            {
                return BadRequest();
            }

            var category = _mapper.Map<Category>(categoryDto);

            await _categoryRepository.update(category);

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

