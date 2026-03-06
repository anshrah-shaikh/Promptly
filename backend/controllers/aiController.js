// Category aware prompt generator (fake AI for now)

const generatePrompt = async (req, res) => {
  try {

    const { type } = req.body;

    const prompts = {

      fantasy: [
        "A forgotten kingdom wakes when a girl hums an ancient lullaby.",
        "A sword that remembers every battle.",
        "Dragons disappear whenever someone tells the truth.",
        "A mage who can only cast spells while crying."
      ],

      horror: [
        "Every mirror in the house shows someone standing behind you.",
        "The lights flicker whenever your name is whispered.",
        "A town where nobody casts a shadow.",
        "You hear breathing from inside the walls."
      ],

      romance: [
        "Two strangers keep meeting in dreams before ever meeting in real life.",
        "They fall in love through anonymous letters.",
        "Every time they hold hands, time resets.",
        "Love written in margins of borrowed books."
      ],

      mystery: [
        "A library book contains notes written about events that haven't happened yet.",
        "A phone keeps receiving calls from tomorrow.",
        "A key opens doors that don’t exist.",
        "Someone erased themselves from every photograph.",
        "A girl finds a letter written by her future self."
      ],

      angst: [
        "A letter that arrives years too late.",
        "Two best friends meet again as enemies.",
        "You remember a person nobody else does.",
        "Someone watches their life fall apart in silence."
      ],

      general: [
        "A message arrives from someone who should not exist.",
        "The sky changes color based on emotions.",
        "Time stops — except for one person.",
        "A diary that predicts tomorrow.",
        "The sky turns green every time someone lies."

      ]

    };

    const pool = prompts[type] || prompts.general;
    const random = pool[Math.floor(Math.random()*pool.length)];

    res.json({ prompt: random });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generatePrompt };