namespace TODOulette
{
    public class Roulette
    {
        public string UserId { get; set; }
        public List<string> Tasks { get; set; }
        public int DailySpinsLeft { get; set; } = 3;
    }
}