using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Core;
using Core.Models;

namespace Api.Controllers
{
	[Route("api/[controller]")]
	public class MarsController : Controller
	{
		private readonly IMarsRepository rep;
		public MarsController(IMarsRepository rep)
		{
			this.rep = rep;
		}
		// GET api/values
		[HttpGet]
		public IEnumerable<World> Get()
		{
			return rep.GetAll();
		}

		// GET api/values/5
		[HttpGet("{id}")]
		public World Get(Guid id)
		{
			return rep.FirstOrDefault(c => c.PublicId == id);
		}

		// POST api/values
		[HttpPost]
		public void Post([FromBody]World world)
		{
			rep.Add(world);
		}

		// PUT api/values/5
		[HttpPut]
		public void Put([FromBody]World world)
		{
			rep.Update(world);
		}

		// DELETE api/values/5
		[HttpDelete("{id}")]
		public void Delete(Guid id)
		{
			var world = rep.FirstOrDefault(q => q.PublicId == id);
			rep.Delete(world);
		}
	}
}
