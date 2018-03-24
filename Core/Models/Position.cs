using Core.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models
{
	public class Position
	{
		public byte X { get; set; }
		public byte Y { get; set; }
		public Direction Direction { get; set; }
	}
}
