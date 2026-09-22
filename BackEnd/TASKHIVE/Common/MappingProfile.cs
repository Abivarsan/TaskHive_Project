using AutoMapper;
using TASKHIVE.DTO.Category;
using TASKHIVE.DTO.Role;
using TASKHIVE.DTO.Users;
using TASKHIVE.Model;
using TASKHIVE.DTO.Report;
using TASKHIVE.DTO.UserCategory;
using TASKHIVE.DTO.Project;
using TASKHIVE.DTO.Work;
using TASKHIVE.DTO.TimeLog;
using TASKHIVE.DTO.Meeting;
using TASKHIVE.DTO.Label;
using TASKHIVE.DTO.WorkLabel;
using TASKHIVE.DTO.UserWork;
using TASKHIVE.DTO.UserMeeting;

namespace TASKHIVE.Common
{
    public class MappingProfile : Profile
    {
        public MappingProfile() {

            CreateMap<Role, CreateRoleDto>().ReverseMap();
            CreateMap<Role, UpdateRoleDto>().ReverseMap();
            CreateMap<Role, GetRoleByIdDto>().ReverseMap();
            CreateMap<Role, GetAllRoleDto>().ReverseMap();

            CreateMap<User, CreateUserDto>().ReverseMap();
            CreateMap<User, UpdateUserDto>().ReverseMap();
            CreateMap<User, GetUserByIdDto>().ReverseMap();
            CreateMap<User, GetAllUserDto>().ReverseMap();

            CreateMap<Category, CreateCategoryDto>().ReverseMap();
            CreateMap<Category, UpdateCategoryDto>().ReverseMap();
            CreateMap<Category, GetCategoryByIdDto>().ReverseMap();
            CreateMap<Category, GetAllCategoryDto>().ReverseMap();

            CreateMap<Report, CreateReportDto>().ReverseMap();
            CreateMap<Report, UpdateReportDto>().ReverseMap();
            CreateMap<Report, GetReportByIdDto>().ReverseMap();
            CreateMap<Report, GetAllReportDto>().ReverseMap();

            CreateMap<UserCategory, CreateUserCategoryDto>().ReverseMap();
            CreateMap<UserCategory, UpdateUserCategoryDto>().ReverseMap();
            CreateMap<UserCategory, GetUserCategoryByIdDto>().ReverseMap();
            CreateMap<UserCategory, GetAllUserCategoryDto>().ReverseMap();

            CreateMap<Project, CreateProjectDto>().ReverseMap();
            CreateMap<Project, UpdateProjectDto>().ReverseMap();
            CreateMap<Project, GetProjectByIdDto>().ReverseMap();
            CreateMap<Project, GetAllProjectDto>().ReverseMap();

            CreateMap<Work, CreateWorkDto>().ReverseMap();
            CreateMap<Work, UpdateWorkDto>().ReverseMap();
            CreateMap<Work, GetWorkByIdDto>().ReverseMap();
            CreateMap<Work, GetAllWorkDto>().ReverseMap();

            CreateMap<TimeLog, CreateTimeLogDto>().ReverseMap();
            CreateMap<TimeLog, UpdateTimeLogDto>().ReverseMap();
            CreateMap<TimeLog, GetTimeLogByIdDto>().ReverseMap();
            CreateMap<TimeLog, GetAllTimeLogDto>().ReverseMap();

            CreateMap<Meeting, CreateMeetingDto>().ReverseMap();
            CreateMap<Meeting, UpdateMeetingDto>().ReverseMap();
            CreateMap<Meeting, GetMeetingByIdDto>().ReverseMap();
            CreateMap<Meeting, GetAllMeetingDto>().ReverseMap();

            CreateMap<Label, CreateLabelDto>().ReverseMap();
            CreateMap<Label, UpdateLabelDto>().ReverseMap();
            CreateMap<Label, GetLabelByIdDto>().ReverseMap();
            CreateMap<Label, GetAllLabelDto>().ReverseMap();

            CreateMap<WorkLabel, CreateWorkLabelDto>().ReverseMap();
            CreateMap<WorkLabel, UpdateWorkLabelDto>().ReverseMap();
            CreateMap<WorkLabel, GetWorkLabelByIdDto>().ReverseMap();
            CreateMap<WorkLabel, GetAllWorkLabelDto>().ReverseMap();

            CreateMap<UserWork, CreateUserWorkDto>().ReverseMap();
            CreateMap<UserWork, UpdateUserWorkDto>().ReverseMap();
            CreateMap<UserWork, GetUserWorkByIdDto>().ReverseMap();
            CreateMap<UserWork, GetAllUserWorkDto>().ReverseMap();

            CreateMap<UserMeeting, CreateUserMeetingDto>().ReverseMap();
            CreateMap<UserMeeting, UpdateUserMeetingDto>().ReverseMap();
            CreateMap<UserMeeting, GetUserMeetingDto>().ReverseMap();
            CreateMap<UserMeeting, GetAllUserMeetingDto>().ReverseMap();

        }
        
    }
}
