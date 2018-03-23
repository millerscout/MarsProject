using Moq;
using SimpleInjector;
using System;
using Xunit;

namespace ApiTestProj
{
	public class TestGrid
	{
		public TestGrid()
		{

			var mock = new Mock<IGridMaker>();
			container.Register(() => mock);
		}
		private Container container = new Container();


		[Fact(DisplayName = "Should generate a layer with length equals 5,5")]
		public void MustBeAFiveGrid()
		{

			byte x = 5;
			byte y = 5;
			var mock = container.GetInstance<Mock<IGridMaker>>();
			mock.Setup(q => q.GenerateGrid(It.IsAny<byte>(), It.IsAny<byte>())).Returns<byte, byte>((argX, argY) => new Grid() { X = argX, Y = argY });

			var result = mock.Object.GenerateGrid(x, y);

			Assert.True(result.X == x && result.Y == y);

		}

		[Fact(DisplayName = "Should add a single Probe at 2,3 towards south")]
		public void AddSingleProbe()
		{

			var mock = container.GetInstance<Mock<IGridMaker>>();

			mock.Setup(q => q.AddProbe(It.IsAny<Position>())).Returns<Position>((Position) => new Probe { CurrentPosition = Position });

			var result = mock.Object.AddProbe(new Position { Direction = Direction.South, X = 2, Y = 3 });

			Assert.True(result.CurrentPosition.X == 2);
			Assert.True(result.CurrentPosition.Y == 3);
			Assert.True(result.CurrentPosition.Direction == Direction.South);

		}


		public interface ICommandCenter
		{
			void MoveProbes(int turns);
		}

		public interface IGridMaker
		{
			Grid GenerateGrid(byte X, byte Y);
			Probe AddProbe(Position position);
		}
	}
	public enum Direction
	{
		North,
		South,
		East,
		West
	}
	public class Probe
	{
		public Position CurrentPosition { get; set; }
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
