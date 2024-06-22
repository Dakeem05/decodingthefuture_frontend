export default function QuestList() {
  const dummyQuests = [
    {
      task: "Follow FOCOSA on Twitter",
      points: 1000,
    },
    {
      task: "Follow FOCOSA on Instagram",
      points: 1000,
    },
    {
      task: "Register for Decoding The Future Event",
      points: 1000,
    },
    {
      task: "Join Decoding The Future Event Whatsapp community",
      points: 1000,
    },
  ];
  return (
    <div className="lg:px-20 px-3 py-12 font-xeroda">
      <h1 className="text-4xl lg:text-5xl mb-1">Decoding The<br className="lg:hidden" /> Future Quest</h1>
      <p className="text-sm lg:text-lg">
        Participate in exciting tasks and quests to earn DTF points and climb
        the leaderboard.
      </p>
      <p className="text-sm lg:text-lg">
        Compete with others for a chance to win amazing tech prizes like phones,
        laptops, access to premium courses, and more. Join now and let the
        adventure begin!
      </p>

      <div className="mt-20">
        <h1 className="text-xl lg:text-2xl mb-3">Tasks</h1>

        <div className="">
          {dummyQuests.map((quest, i) => {
            return (
              <div
                className="bg-[#1B1E24] rounded-[10px] py-3 px-3 lg:px-7 last:mb-0 mb-4 text-base flex items-center space-x-2 lg:text-lg"
                key={i}
              >
                <p className="flex-grow">{quest.task}</p>
                <div className="flex items-center space-x-1">
                  <div
                    style={{
                      background:
                        "linear-gradient(296.93deg, #FFE600 13.61%, #FFF7AD 110.94%)",
                    }}
                    className="w-4 h-4 rounded-full"
                  ></div>
                  <p>{quest.points}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
