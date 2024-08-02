export interface PowerStats {
  intelligence: string;
  strength: string;
  speed: string;
  durability: string;
  power: string;
  combat: string
}

export interface SuperHero {
  id: string;
  name: string;
  powerstats: PowerStats;
  image: {
    url: string
  }
}