using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonApi.Data; 
using PersonApi.Models; 


namespace PersonApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonsController : ControllerBase
    {
        private readonly PersonContext _context;

        public PersonsController(PersonContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> GetPersons()
        {
            return await _context.Persons.ToListAsync();
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> GetPerson(int id)
        {
            var person = await _context.Persons.FindAsync(id);

            if (person == null)
            {
                return NotFound();
            }

            return person;
        }

     
        [HttpPost]
        public async Task<ActionResult<Person>> PostPerson(Person person)
        {
            if (person == null)
            {
                return BadRequest("Person data is null.");
            }

           
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Persons.Add(person);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
             
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return CreatedAtAction(nameof(GetPerson), new { id = person.Id }, person);
        }
    }
}