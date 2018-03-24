using Core.Enums;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Core.Models
{
	public class Probe
	{
		public Probe()
		{
			Commands = new List<Command>();
		}
		public Guid PublicId { get; set; }
		public int Order { get; set; }
		[JsonIgnore]
		public bool HasInstructions { get { return Commands == null ? false : Commands.Count > 0; } }
		public List<Command> Commands { get; set; }
		public Position CurrentPosition { get; set; }

		public Command GetNextCommand()
		{
			var command = Commands.FirstOrDefault();
			Commands.RemoveRange(0, 1);
			return command;
		}

		public void Move(Command command)
		{
			switch (command)
			{
				case Command.TurnLeft:
					if (CurrentPosition.Direction == Direction.North)
					{
						CurrentPosition.Direction = Direction.West;
					}
					else
					{
						CurrentPosition.Direction = CurrentPosition.Direction - 1;
					}
					break;
				case Command.Forward:
					if (CurrentPosition.Direction == Direction.North)
					{
						CurrentPosition.Y += 1;
					}
					if (CurrentPosition.Direction == Direction.South)
					{
						CurrentPosition.Y -= 1;

					}
					if (CurrentPosition.Direction == Direction.East)
					{
						CurrentPosition.X += 1;
					}
					if (CurrentPosition.Direction == Direction.West)
					{
						CurrentPosition.X -= 1;
					}
					break;
				case Command.TurnRight:
					if (CurrentPosition.Direction == Direction.West)
					{
						CurrentPosition.Direction = Direction.North;
					}
					else
					{
						CurrentPosition.Direction = CurrentPosition.Direction + 1;
					}
					break;
				default:
					break;
			}
		}

		public void AddCommands(string commands)
		{
			Commands = commands.ToCharArray().Select(q => q == 'L' ? Command.TurnLeft : q == 'R' ? Command.TurnRight : Command.Forward).ToList();
		}
	}
}
