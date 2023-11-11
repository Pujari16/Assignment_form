using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace FormTask.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FormDataController : Controller
    {
        private readonly FormDBContext _dbContext;
        public FormDataController(FormDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost]
        public IActionResult AddData([FromBody] FormModel formModel)
        {
            try
            {
                Console.WriteLine(formModel.DateOfBirth);
                formModel.DateOfBirth = DateTime.ParseExact(formModel.Dob, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                var details = new FormModel() { DateOfBirth = formModel.DateOfBirth, FullName = formModel.FullName, Email = formModel.Email, Age = formModel.Age, Id = 0 };
                _dbContext.FormInformation.Add(details);
                _dbContext.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error.");
            }
        }
        [HttpGet("viewData")]
        public IActionResult GetData()
        {
            try
            {
                var data = _dbContext.FormInformation.ToList();
                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error.");
            }
        }
    }
}
