using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TASKHIVE.DTO.Role;
using TASKHIVE.DTO.Users;
using TASKHIVE.IRepository;
using TASKHIVE.Model;
using TASKHIVE.Service;

namespace TASKHIVE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _usersRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<UsersController> _logger;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IEmailService _emailService;
        private readonly IPasswordGenerator _passwordGenerator;
        private readonly IJwtService _jwtService;
        public UsersController(
            IUsersRepository usersRepository, 
            IMapper mapper, 
            ILogger<UsersController> logger,
            IPasswordHasher passwordHasher,
            IEmailService emailService,
            IPasswordGenerator passwordGenerator,
            IJwtService jwtService)
        {
            _usersRepository = usersRepository;
            _mapper = mapper;
            _logger = logger;
            _passwordHasher = passwordHasher;
            _emailService = emailService;
            _passwordGenerator = passwordGenerator;
            _jwtService = jwtService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]

        public async Task<ActionResult<CreateUserDto>> Create([FromBody] CreateUserDto usersDto)
        {
            var result = _usersRepository.IsRecordExists(x => x.email == usersDto.email);

            if (result)
            {
                return Conflict("Email already exists");

            }

            // Generate random password
            var temporaryPassword = _passwordGenerator.GenerateRandomPassword();

            // Hash the password
            var hashedPassword = _passwordHasher.HashPassword(temporaryPassword);

            var users = _mapper.Map<User>(usersDto);
            users.password = hashedPassword;
            users.isFirstLogin = true;

           

            // Send welcome email with temporary password
            try
            {
                await _emailService.SendWelcomeEmailAsync(users.email, users.userName, temporaryPassword);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send welcome email to {Email}", users.email);
                // Continue even if email fails - user creation was successful
            }

            await _usersRepository.create(users);

            return CreatedAtAction("GetById", new { id = users.userId }, users);
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginRequestDto loginDto)
        {
            var user = (await _usersRepository.GetAll())
                .FirstOrDefault(u => u.email == loginDto.Email);

            if (user == null || !_passwordHasher.VerifyPassword(loginDto.Password, user.password))
            {
                return Unauthorized("Invalid email or password");
            }

            var token = _jwtService.GenerateToken(user);

            var response = new LoginResponseDto
            {
                Token = token,
                UserId = user.userId,
                UserName = user.userName,
                Email = user.email,
                RoleId = user.roleId,
                UserCategoryId = user.userCategoryId,
                IsFirstLogin = user.isFirstLogin
            };

            return Ok(response);
        }


        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<IEnumerable<GetAllUserDto>>> GetAll()
        {
            var users = await _usersRepository.GetAll();

            var usersDto = _mapper.Map<List<GetAllUserDto>>(users);

            if (users == null)
            {
                return NoContent();
            }

            return Ok(usersDto);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<GetUserByIdDto>> GetById(int id)
        {
            var users = await _usersRepository.Get(id);



            if (users == null)
            {
                _logger.LogError($"Error while try to get record id: {id}");
                return NoContent();
            }
            var usersDto = _mapper.Map<GetUserByIdDto>(users);

            return Ok(usersDto);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<User>> Update(int id, [FromBody] UpdateUserDto usersDto)
        {
            if (usersDto == null || id != usersDto.userId)
            {
                return BadRequest();
            }

            var users = _mapper.Map<User>(usersDto);

            await _usersRepository.update(users);

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult<User>> DeleteById(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            var role = await _usersRepository.Get(id);

            if (role == null)
            {
                return NotFound();
            }

            await _usersRepository.delete(role);
            return NoContent();
        }
    }
}

