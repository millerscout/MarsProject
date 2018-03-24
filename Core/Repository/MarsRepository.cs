using Core.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Core
{
	public interface IMarsRepository : IBaseRepository<World> { };
	public class MarsRepository : IBaseRepository<World>, IMarsRepository
	{
		private IMongoCollection<World> collection;

		public MarsRepository(string connectionString)
		{
			collection = new MongoClient(connectionString)
				.GetDatabase("MarsProject")
				.GetCollection<World>("World");
		}

		public void Add(World entity)
		{
			entity.PublicId = Guid.NewGuid();
			collection.InsertOne(entity);
		}

		public void Add(ICollection<World> entities)
		{
			entities.ToList().ForEach((e) => { e.PublicId = Guid.NewGuid(); });

			collection.InsertMany(entities);
		}

		public void Delete(World entity)
		{
			collection.DeleteOne(m => m.PublicId == entity.PublicId);
		}

		public IEnumerable<World> FindBy(Expression<Func<World, bool>> predicate)
		{
			return collection.Find(predicate).ToEnumerable();
		}

		public World FirstOrDefault(Expression<Func<World, bool>> predicate)
		{
			return FindBy(predicate).FirstOrDefault();
		}

		public IEnumerable<World> GetAll()
		{
			return collection.Find(q => true).ToList();
		}


		public void Update(World entity)
		{
			var filter = Builders<World>.Filter.Eq(q => q.PublicId, entity.PublicId);
			var update = Builders<World>.Update
										  .Set(x => x.Grid, entity.Grid);

			collection.UpdateOne(filter, update);
		}

	}

	public interface IBaseRepository<T> where T : class
	{
		IEnumerable<T> GetAll();
		IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate);
		T FirstOrDefault(Expression<Func<T, bool>> predicate);
		void Add(T entity);
		void Add(ICollection<T> entities);
		void Delete(T entity);
		void Update(T entity);
	}

}