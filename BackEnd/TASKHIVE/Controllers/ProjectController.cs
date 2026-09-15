using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TASKHIVE.DTO.Category;
using TASKHIVE.DTO.Project;
using TASKHIVE.IRepository;
using TASKHIVE.Model;

namespace TASKHIVE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<ProjectController> _logger;
        public ProjectController(IProjectRepository projectRepository, IMapper mapper, ILogger<ProjectController> logger)
        {
            _projectRepository = projectRepository;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]

        public async Task<ActionResult<CreateProjectDto>> Create([FromBody] CreateProjectDto projectDto)
        {
            var result = _projectRepository.IsRecordExists(x => x.projectName == projectDto.projectName);

            if (result)
            {
                return Conflict("Project already exists");
            }
            var project = _mapper.Map<Project>(projectDto);

            await _projectRepository.create(project);

            return CreatedAtAction("GetById", new { id = project.projectId }, project);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<IEnumerable<GetAllProjectDto>>> GetAll()
        {
            var projects = await _projectRepository.GetAll();

            var projectsDto = _mapper.Map<List<GetAllProjectDto>>(projects);

            if (projects == null)
            {
                return NoContent();
            }

            return Ok(projectsDto);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<GetProjectByIdDto>> GetById(int id)
        {
            var project = await _projectRepository.Get(id);



            if (project == null)
            {
                _logger.LogError($"Error while try to get record id: {id}");
                return NoContent();
            }
            var projectDto = _mapper.Map<GetProjectByIdDto>(project);

            return Ok(projectDto);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Project>> Update(int id, [FromBody] UpdateProjectDto projectDto)
        {
            if (projectDto == null || id != projectDto.projectId)
            {
                return BadRequest();
            }

            var project = _mapper.Map<Project>(projectDto);

            await _projectRepository.update(project);

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult<Project>> DeleteById(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            var project = await _projectRepository.Get(id);

            if (project == null)
            {
                return NotFound();
            }

            await _projectRepository.delete(project);
            return NoContent();
        }
    }
}
