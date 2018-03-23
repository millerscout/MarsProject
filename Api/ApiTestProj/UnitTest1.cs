using Moq;
using SimpleInjector;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace ApiTestProj
{
	public class TestGrid
	{
		public TestGrid()
		{


			container.Register<ITerrain>(() => terrainMock.Object);
			container.Register<ICommandCenter>(() => CCmock.Object);
		}
		private Mock<MarsTerrain> terrainMock = new Mock<MarsTerrain>();
		private Mock<CommandCenter> CCmock = new Mock<CommandCenter>();
		private Container container = new Container();


		[Fact(DisplayName = "Should generate a layer with length equals 5,5")]
		public void MustBeAFiveGrid()
		{

			byte x = 5;
			byte y = 5;
			var Terrain = container.GetInstance<ITerrain>();

			var result = Terrain.GenerateGrid(x, y);

			Assert.True(result.X == x && result.Y == y);

		}

		[Fact(DisplayName = "Should add a single Probe at 2,3 towards south")]
		public void AddSingleProbe()
		{

			var terrain = container.GetInstance<ITerrain>();

			var result = terrain.AddProbe(new Position { Direction = Direction.South, X = 2, Y = 3 });

			Assert.True(result.CurrentPosition.X == 2);
			Assert.True(result.CurrentPosition.Y == 3);
			Assert.True(result.CurrentPosition.Direction == Direction.South);

		}

		[Fact(DisplayName = "Should Move a single Probe until end of instructions")]
		public void MoveProbe()
		{
			var CC = container.GetInstance<ICommandCenter>();

			var probe = new Probe { CurrentPosition = new Position { Direction = Direction.North, X = 1, Y = 2 } };
			var probeTwo = new Probe { CurrentPosition = new Position { Direction = Direction.East, X = 3, Y = 3 } };
			var CurrentProbes = new List<Probe>() { probe, probeTwo };
			CCmock.Setup(q => q.GetCurrentProbes()).Returns(() => CurrentProbes).Callback(() =>
			{

				//CurrentProbes.
			});



			probe.AddCommands("LMLMLMLMM");
			probeTwo.AddCommands("MMRMMRMRRM");

			var current = true;
			while (current)
			{
				current = CC.MoveProbes();
			}

			Assert.True(probe.CurrentPosition.X == 1);
			Assert.True(probe.CurrentPosition.Y == 3);
			Assert.True(probe.CurrentPosition.Direction == Direction.North);

			Assert.True(probeTwo.CurrentPosition.X == 5);
			Assert.True(probeTwo.CurrentPosition.Y == 1);
			Assert.True(probeTwo.CurrentPosition.Direction == Direction.East);

		}


		public interface ICommandCenter
		{
			bool MoveProbes(int turns = 1);
		}

		public interface ITerrain
		{
			Grid GenerateGrid(byte X, byte Y);
			Probe AddProbe(Position position);
		}
		public class MarsTerrain : ITerrain
		{
			public Probe AddProbe(Position position)
			{
				return new Probe() { CurrentPosition = position };
			}

			public Grid GenerateGrid(byte X, byte Y)
			{
				return new Grid { X = X, Y = Y };
			}
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

	public enum Direction
	{
		North,
		East,
		South,
		West
	}
	public class Probe
	{
		public bool HasInstructions { get { return Commands.Count > 0; } }
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
	public enum Command
	{
		TurnLeft,
		Forward,
		TurnRight
	}
	public class Position
	{
		public byte X { get; set; }
		public byte Y { get; set; }
		public Direction Direction { get; set; }

	}
	public class Grid
	{
		public byte X { get; set; }
		public byte Y { get; set; }
	}

}
