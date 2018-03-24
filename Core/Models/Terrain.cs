using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Core.Models
{
	public interface IWorld
	{
		Grid GenerateGrid(int X, int Y);
		Probe AddProbe(Position position);
	}
	public class World : IWorld
	{
		[JsonIgnore]
		public ObjectId Id { get; set; }

		public Grid Grid { get; set; }
		[BsonElement("publicId")]
		public Guid PublicId { get; set; }

		[BsonElement("commandCenter")]
		[JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore, NullValueHandling = NullValueHandling.Ignore)]
		public CommandCenter CommandCenter { get; set; }

		public Probe AddProbe(Position position)
		{
			var probe = new Probe()
			{
				CurrentPosition = position,
				PublicId = Guid.NewGuid()
			};
			var order = 0;
			if (CommandCenter == null)
			{
				CommandCenter = new CommandCenter { Probes = new List<Probe>() };
			}
			else
				order = CommandCenter.Probes.Max(q => q.Order) + 1;

			probe.Order = order;
			CommandCenter.Probes.Add(probe);
			return probe;

		}

		public Grid GenerateGrid(int X, int Y)
		{
			return new Grid { X = X, Y = Y };
		}
	}
}
