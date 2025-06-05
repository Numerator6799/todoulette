
namespace TODOulette
{
    public class RouletteService
    {
        private readonly Dictionary<string, Roulette> _userRoulettes = new();

        public string Spin(string userId)
        {
            if (!_userRoulettes.ContainsKey(userId)) return "No roulette found";

            var roulette = _userRoulettes[userId];

            if (roulette.DailySpinsLeft <= 0) return "No spins left for today";

            roulette.DailySpinsLeft--;
            var random = new Random();
            var selectedTask = roulette.Tasks[random.Next(roulette.Tasks.Count)];

            return selectedTask;
        }
    }
}
