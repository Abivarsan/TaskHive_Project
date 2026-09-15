using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TASKHIVE.DTO.UserCategory;
using TASKHIVE.DTO.Users;
using TASKHIVE.IRepository;
using TASKHIVE.Model;
using TASKHIVE.Repository;

namespace TASKHIVE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserCategoryController : ControllerBase
    {
        private readonly IUserCategoryRepository _userCategoryRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<UserCategoryController> _logger;
        public UserCategoryController(IUserCategoryRepository userCategoryRepository, IMapper mapper, ILogger<UserCategoryController> logger)
        {
            _userCategoryRepository = userCategoryRepository;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]

        public async Task<ActionResult<CreateUserCategoryDto>> Create([FromBody] CreateUserCategoryDto userCategoryDto)
        {
            var result = _userCategoryRepository.IsRecordExists(x => x.userCategoryName == userCategoryDto.userCategoryName);

            if (result)
            {
                return Conflict("UserCategory already exists");
            }
            var userCategory = _mapper.Map<UserCategory>(userCategoryDto);

            await _userCategoryRepository.create(userCategory);

            return CreatedAtAction("GetById", new { id = userCategory.userCategoryId }, userCategory);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<IEnumerable<GetAllUserCategoryDto>>> GetAll()
        {
            var userCategories = await _userCategoryRepository.GetAll();

            var userCategoriesDto = _mapper.Map<List<GetAllUserCategoryDto>>(userCategories);

            if (userCategories == null)
            {
                return NoContent();
            }

            return Ok(userCategoriesDto);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<GetUserCategoryByIdDto>> GetById(int id)
        {
            var userCategories = await _userCategoryRepository.Get(id);



            if (userCategories == null)
            {
                _logger.LogError($"Error while try to get record id: {id}");
                return NoContent();
            }
            var userCategoriesDto = _mapper.Map<GetUserCategoryByIdDto>(userCategories);

            return Ok(userCategoriesDto);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<UserCategory>> Update(int id, [FromBody] UpdateUserCategoryDto userCategoriesDto)
        {
            if (userCategoriesDto == null || id != userCategoriesDto.userCategoryId)
            {
                return BadRequest();
            }

            var userCategories = _mapper.Map<UserCategory>(userCategoriesDto);

            await _userCategoryRepository.update(userCategories);

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult<UserCategory>> DeleteById(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            var userCategory = await _userCategoryRepository.Get(id);

            if (userCategory == null)
            {
                return NotFound();
            }

            await _userCategoryRepository.delete(userCategory);
            return NoContent();
        }
    }
}

