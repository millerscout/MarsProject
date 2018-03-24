using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Core;
using Core.Models;
using Microsoft.AspNetCore.Cors;

namespace Api.Controllers
{
	[Route("api/[controller]")]
	[EnableCors("ExternalPolicy")]
	public class MarsController : Controller
	{
		private readonly IMarsRepository rep;
		public MarsController(IMarsRepository rep)
		{
			this.rep = rep;
		}
		[HttpGet]
		public IEnumerable<World> Get()
		{
			return rep.GetAll();
		}

		[HttpGet("{id}")]
		public World Get(string id)
		{
			return rep.FirstOrDefault(c => c.PublicId == Guid.Parse(id));
		}

		[HttpPost]
		public void Post([FromBody]Grid grid)
		{
			var world = new World { Grid = grid };
			world.PublicId = Guid.NewGuid();
			rep.Add(world);
		}

		[HttpPut]
		public void Put([FromBody]World world)
		{
			rep.Update(world);
		}

		[HttpDelete("{id}")]
		public void Delete(string id)
		{
			var world = rep.FirstOrDefault(q => q.PublicId == Guid.Parse(id));
			rep.Delete(world);
		}
	}
}
