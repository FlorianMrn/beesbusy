interface RawCharacter {
  name: string; // The name of this person.
  birth_year: string; // The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin.
  eye_color: string; // The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye.
  gender: string; // The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender.
  hair_color: string; // The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair.
  height: string; // The height of the person in centimeters.
  mass: string; // The mass of the person in kilograms.
  skin_color: string; // The skin color of this person.
  homeworld: string; // The URL of a planet resource, a planet that this person was born on or inhabits.
  films: string[]; // An array of film resource URLs that this person has been in.
  species: string[]; // An array of species resource URLs that this person belongs to.
  starships: string[]; // An array of starship resource URLs that this person has piloted.
  vehicles: string[]; // An array of vehicle resource URLs that this person has piloted.
  url: string; // the hypermedia URL of this resource.
  created: string; // the ISO 8601 date format of the time that this resource was created.
  edited: string; // the ISO 8601 date format of the time that this resource was edited.
}
