require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_URI,
  {
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err) {
    if (err) {
      console.log("Connection error: " + err);
      process.exit(1);
    }
  },
);

var Schema = mongoose.Schema;
var dataSchema = new Schema({
  name: String,
  id: Number,
  description: String,
  image: String,
  velocity: String,
  distance: String,
});
var planetModel = mongoose.model("planets", dataSchema);

var planets = [
  {
    id: 1,
    name: "Mercury",
    description: "Mercury is the smallest planet in the Solar System and the closest to the Sun.",
    image: "mercury.png",
    velocity: "47.87 km/s",
    distance: "57.91 million km",
  },
  {
    id: 2,
    name: "Venus",
    description: "Venus is the second planet from the Sun. It is sometimes called Earth's sister planet.",
    image: "venus.png",
    velocity: "35.02 km/s",
    distance: "108.2 million km",
  },
  {
    id: 3,
    name: "Earth",
    description: "Earth is the third planet from the Sun and the only known planet to harbor life.",
    image: "earth.png",
    velocity: "29.78 km/s",
    distance: "149.6 million km",
  },
  {
    id: 4,
    name: "Mars",
    description: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.",
    image: "mars.png",
    velocity: "24.07 km/s",
    distance: "227.9 million km",
  },
  {
    id: 5,
    name: "Jupiter",
    description: "Jupiter is the fifth planet from the Sun and the largest in the Solar System.",
    image: "jupiter.png",
    velocity: "13.07 km/s",
    distance: "778.5 million km",
  },
  {
    id: 6,
    name: "Saturn",
    description: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System.",
    image: "saturn.png",
    velocity: "9.69 km/s",
    distance: "1.434 billion km",
  },
  {
    id: 7,
    name: "Uranus",
    description: "Uranus is the seventh planet from the Sun and has the third-largest diameter in the Solar System.",
    image: "uranus.png",
    velocity: "6.81 km/s",
    distance: "2.871 billion km",
  },
  {
    id: 8,
    name: "Neptune",
    description: "Neptune is the eighth and farthest known Solar planet from the Sun.",
    image: "neptune.png",
    velocity: "5.43 km/s",
    distance: "4.495 billion km",
  },
];

async function seed() {
  try {
    await planetModel.deleteMany({});
    console.log("Cleared existing planets.");

    await planetModel.insertMany(planets);
    console.log("Inserted 8 planets successfully.");

    mongoose.connection.close();
    console.log("Done. Connection closed.");
  } catch (err) {
    console.error("Seed error:", err);
    mongoose.connection.close();
    process.exit(1);
  }
}

mongoose.connection.once("open", seed);
