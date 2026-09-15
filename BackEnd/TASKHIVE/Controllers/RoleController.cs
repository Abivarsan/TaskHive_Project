using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TASKHIVE.DTO.Role;
using TASKHIVE.IRepository;
using TASKHIVE.Model;

namespace TASKHIVE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<RoleController> _logger;
        public RoleController(IRoleRepository roleRepository, IMapper mapper, ILogger<RoleController> logger)
        {
            _roleRepository = roleRepository;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]

        public async Task<ActionResult<CreateRoleDto>> Create([FromBody] CreateRoleDto roleDto)
        {
            var result = _roleRepository.IsRecordExists(x => x.roleName == roleDto.roleName);

            if (result)
            {
                return Conflict("Role already exists");
            }
            var role = _mapper.Map<Role>(roleDto);

            await _roleRepository.create(role);

            return CreatedAtAction("GetById", new { id = role.roleId }, role);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<IEnumerable<GetAllRoleDto>>> GetAll()
        {
            var roles = await _roleRepository.GetAll();

            var rolesDto = _mapper.Map<List<GetAllRoleDto>>(roles);

            if (roles == null)
            {
                return NoContent();
            }

            return Ok(rolesDto);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<GetRoleByIdDto>> GetById(int id)
        {
            var role = await _roleRepository.Get(id);



            if (role == null)
            {
                _logger.LogError($"Error while try to get record id: {id}");
                return NoContent();
            }
            var roleDto = _mapper.Map<GetRoleByIdDto>(role);

            return Ok(roleDto);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Role>> Update(int id, [FromBody] UpdateRoleDto roleDto)
        {
            if (roleDto == null || id != roleDto.roleId)
            {
                return BadRequest();
            }

            var role = _mapper.Map<Role>(roleDto);

            await _roleRepository.update(role);

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult<Role>> DeleteById(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            var role = await _roleRepository.Get(id);

            if (role == null)
            {
                return NotFound();
            }

            await _roleRepository.delete(role);
            return NoContent();
        }
    }
}