using Core;
using Core.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{

	[Route("api/[controller]")]
	[EnableCors("ExternalPolicy")]
	public class CommandCenterController : Controller
	{
		private readonly IMarsRepository rep;
		public CommandCenterController(IMarsRepository rep)
		{
			this.rep = rep;
		}
		[HttpPut]
		[Route("saveCommands/{worldId}")]
		public void SaveCommands(string worldId, [FromBody] CommandCenter cc)
		{
			var world = rep.FirstOrDefault(q => q.PublicId == Guid.Parse(worldId));

			world.CommandCenter.Probes = cc.Probes;

			rep.Update(world);
		}
		[HttpPost]
		[Route("addProbe/{worldId}")]
		public CommandCenter AddProbe(string worldId, [FromBody] Position pos)
		{
			var world = rep.FirstOrDefault(q => q.PublicId == Guid.Parse(worldId));

			world.AddProbe(pos);

			rep.Update(world);

			return world.CommandCenter;

		}
		[HttpPost]
		[Route("moveProbes")]
		public CommandCenter MoveProbes([FromBody] CommandCenter cc)
		{
			cc.MoveProbes();

			return cc;
		}

	}
}