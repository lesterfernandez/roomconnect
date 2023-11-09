const cleanliness: string[] = ["Messy", "Average", "Clean Freak"];
const budget: string[] = ["1000", "1000-2000", "2000+"];
const loudness: string[] = ["Quiet", "Average", "Party Animal"];
const coed: string[] = ["No", "Yes"];
const gender: { [key: string]: string } = {
  male: "Male",
  female: "Female",
  other: "Other",
  "prefer not to say": "Prefer not to say",
};

export default {
  cleanliness,
  budget,
  loudness,
  coed,
  gender,
};
