using Core.Enums;
using Core.Models;
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


			container.Register<IWorld>(() => terrainMock.Object);
			container.Register<ICommandCenter>(() => CCmock.Object);
		}
		private Mock<World> terrainMock = new Mock<World>();
		private Mock<CommandCenter> CCmock = new Mock<CommandCenter>();
		private Container container = new Container();


		[Fact(DisplayName = "Should generate a layer with length equals 5,5")]
		public void MustBeAFiveGrid()
		{

			byte x = 5;
			byte y = 5;
			var Terrain = container.GetInstance<IWorld>();

			var result = Terrain.GenerateGrid(x, y);

			Assert.True(result.X == x && result.Y == y);

		}

		[Fact(DisplayName = "Should add a single Probe at 2,3 towards south")]
		public void AddSingleProbe()
		{

			var terrain = container.GetInstance<IWorld>();

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
			CCmock.Setup(q => q.GetCurrentProbes()).Returns(() => CurrentProbes);

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

	}
}
