using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models
{
	public interface IWorld
	{
		Grid GenerateGrid(byte X, byte Y);
		Probe AddProbe(Position position);
	}
	public class World : IWorld
	{
		public Grid Grid { get; set; }
		[BsonElement("publicId")]
		public Guid PublicId { get; set; }

		[BsonElement("commandCenter")]
		public CommandCenter CommandCenter { get; set; }

		public Probe AddProbe(Position position)
		{
			return new Probe() { CurrentPosition = position };
		}

		public Grid GenerateGrid(byte X, byte Y)
		{
			return new Grid { X = X, Y = Y };
		}
	}
}
