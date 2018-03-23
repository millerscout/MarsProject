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
			container.Register<IGridMaker>(() => mock.Object);
		}
		private Container container = new Container();


		[Fact(DisplayName = "MakeLayer")]
		public void Layer()
		{

			var mock = container.GetInstance<Mock<IGridMaker>>();


		}

		public interface IGridMaker
		{
			Grid GenerateGrid();
		}
	}
	public class Grid
	{

	}

}
