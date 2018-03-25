using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Core.Models
{
	public interface ICommandCenter
	{
		bool MoveProbes(int turns = 1);
	}

	public class CommandCenter : ICommandCenter
	{
		public List<Probe> Probes { get; set; }
		public virtual List<Probe> GetCurrentProbes()
		{
			return Probes;
		}
		public bool MoveProbes(int turns = 1)
		{

			var probes = GetCurrentProbes();

			var current = probes.OrderBy(q => q.Order).FirstOrDefault(q => q.HasInstructions);

			var command = current.GetNextCommand();

			current.Move(command);

			return probes.Any(q => q.HasInstructions);
		}
	}
}
