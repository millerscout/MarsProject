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
		public virtual List<Probe> GetCurrentProbes()
		{
			throw new NotImplementedException();
		}
		public bool MoveProbes(int turns = 1)
		{
			var probes = GetCurrentProbes();

			var current = probes.FirstOrDefault(q => q.HasInstructions);

			var command = current.GetNextCommand();

			current.Move(command);

			return probes.Any(q => q.HasInstructions);
		}
	}
}
