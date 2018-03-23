using MongoDB.Bson;
using MongoDB.Driver;
namespace Core
{
	public class MarsRepository : IMarsRepository
	{
		private MongoClient client;

		public MarsRepository(string connectionString)
		{
			client = new MongoClient(connectionString);
		}
		public BsonDocument dosome()
		{

			var database = client.GetDatabase("Mars");

			var collection = database.GetCollection<BsonDocument>("Map");
			var s = collection.Find(new BsonDocument()).FirstOrDefault();
			//var document = new BsonDocument{
			//	{ "name", "MongoDB" },
			//	{ "type", "Database" },
			//	{ "count", 1 },
			//	{ "info", new BsonDocument
			//		{
			//			{ "x", 203 },
			//			{ "y", 102 }
			//		}}
			//};

			//collection.InsertOne(document);
			return s;
		}
	}

	public interface IMarsRepository
	{
		BsonDocument dosome();
	}
}
