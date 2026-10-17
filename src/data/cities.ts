// Service-area pages. Each entry generates /service-area/<slug> and feeds the ZIP checker.
// TODO: confirm with the client which of these areas they actually serve at launch.

export type City = {
  slug: string;
  name: string;
  county: string;
  zips: string[];
  areas: string[];
  intro: string;
};

export const cities: City[] = [
  {
    slug: "columbus",
    name: "Columbus",
    county: "Franklin County",
    zips: [
      "43201", "43202", "43203", "43204", "43205", "43206", "43207", "43209", "43210",
      "43211", "43212", "43213", "43214", "43215", "43219", "43220", "43221", "43222",
      "43223", "43224", "43227", "43228", "43229", "43231", "43232", "43235", "43240",
    ],
    areas: ["German Village", "Short North", "Clintonville", "Victorian Village", "Italian Village", "Easton", "Polaris", "the University District"],
    intro:
      "From brick-lined streets in German Village to new builds near Polaris, Columbus homes and apartment communities count on us to get trash out on time, every time.",
  },
  {
    slug: "dublin",
    name: "Dublin",
    county: "Franklin, Delaware & Union Counties",
    zips: ["43016", "43017"],
    areas: ["Bridge Park", "Historic Dublin", "Muirfield Village", "Tartan West"],
    intro:
      "Dublin neighborhoods take curb appeal seriously. We keep cans out of sight until pickup and back where they belong right after, so your street always looks its best.",
  },
  {
    slug: "westerville",
    name: "Westerville",
    county: "Franklin & Delaware Counties",
    zips: ["43081", "43082"],
    areas: ["Uptown Westerville", "Otterbein", "Highlands", "Medallion"],
    intro:
      "Busy Westerville families hand trash day to us. We roll cans to the curb the night before and bring them back up the driveway after the truck comes through.",
  },
  {
    slug: "hilliard",
    name: "Hilliard",
    county: "Franklin County",
    zips: ["43026"],
    areas: ["Old Hilliard", "Heritage Preserve", "Hayden Run", "Britton Farms"],
    intro:
      "Hilliard is growing fast, and so are the trash bins. We handle can-to-curb service for homes and doorstep valet trash for the area's newer apartment communities.",
  },
  {
    slug: "grove-city",
    name: "Grove City",
    county: "Franklin County",
    zips: ["43123"],
    areas: ["Town Center", "Pinnacle", "Beulah Park", "Farmstead"],
    intro:
      "Grove City homeowners and property managers use us for reliable trash day help, bin cleaning and same-week junk hauling.",
  },
  {
    slug: "gahanna",
    name: "Gahanna",
    county: "Franklin County",
    zips: ["43230"],
    areas: ["Creekside", "Olde Gahanna", "Academy Woods", "Hunters Ridge"],
    intro:
      "We serve Gahanna homes and apartments with scheduled trash can service, doorstep valet trash and on-demand pickups.",
  },
  {
    slug: "upper-arlington",
    name: "Upper Arlington",
    county: "Franklin County",
    zips: ["43220", "43221"],
    areas: ["Tremont", "Kingsdale", "Mallway", "Northam Park"],
    intro:
      "Long driveways and tree-lined streets are what Upper Arlington is known for. We take care of the trek to the curb so you don't have to.",
  },
  {
    slug: "worthington",
    name: "Worthington",
    county: "Franklin County",
    zips: ["43085"],
    areas: ["Old Worthington", "Colonial Hills", "Rush Creek", "Worthington Estates"],
    intro:
      "Worthington residents count on us for on-time cans, clean bins and fast junk removal, all handled by a local team.",
  },
  {
    slug: "new-albany",
    name: "New Albany",
    county: "Franklin & Licking Counties",
    zips: ["43054"],
    areas: ["Market Square", "The Reserve", "Ashton Grove", "Highgrove"],
    intro:
      "New Albany's estate homes often mean long walks to the curb. Our Estate plan covers up to six cans, gated entries and long driveways.",
  },
  {
    slug: "powell",
    name: "Powell",
    county: "Delaware County",
    zips: ["43065"],
    areas: ["Golf Village", "Olentangy Falls", "Liberty Township", "Downtown Powell"],
    intro:
      "Powell families trust us with trash day so their evenings stay free for practice, homework and everything else.",
  },
  {
    slug: "lewis-center",
    name: "Lewis Center",
    county: "Delaware County",
    zips: ["43035"],
    areas: ["Polaris", "Alum Creek", "Northstar", "Highlands Park"],
    intro:
      "Near Polaris and up through Orange Township, we bring cans to the curb and back for homes, townhomes and apartment communities.",
  },
  {
    slug: "delaware",
    name: "Delaware",
    county: "Delaware County",
    zips: ["43015"],
    areas: ["Downtown Delaware", "Glenross", "Nottingham", "Kensington Place"],
    intro:
      "From downtown Delaware to the newer neighborhoods on the edge of town, we make trash day one less thing to think about.",
  },
  {
    slug: "reynoldsburg",
    name: "Reynoldsburg",
    county: "Franklin, Licking & Fairfield Counties",
    zips: ["43068"],
    areas: ["Olde Reynoldsburg", "Huron Park", "Taylor Square", "Brice"],
    intro:
      "Reynoldsburg homes and multifamily properties use us for scheduled can service, valet trash and bulk item pickup.",
  },
  {
    slug: "pickerington",
    name: "Pickerington",
    county: "Fairfield County",
    zips: ["43147"],
    areas: ["Olde Pickerington Village", "Sycamore Creek", "Windmiller", "Shawnee Crossing"],
    intro:
      "We help Pickerington homeowners skip the weekly can haul and keep their bins clean and odor-free.",
  },
  {
    slug: "canal-winchester",
    name: "Canal Winchester",
    county: "Franklin & Fairfield Counties",
    zips: ["43110"],
    areas: ["Old Town", "Westchester", "Winchester Lakes", "Ashbrook"],
    intro:
      "Canal Winchester residents get the same reliable, photo-verified trash service as the rest of Central Ohio.",
  },
  {
    slug: "grandview-heights",
    name: "Grandview Heights",
    county: "Franklin County",
    zips: ["43212"],
    areas: ["Grandview Avenue", "Grandview Yard", "Marble Cliff"],
    intro:
      "Narrow lots and alleys are no problem. We know Grandview and get your cans where they need to be on pickup day.",
  },
  {
    slug: "bexley",
    name: "Bexley",
    county: "Franklin County",
    zips: ["43209"],
    areas: ["Main Street", "Jeffrey Park", "Capital University", "Bullitt Park"],
    intro:
      "Bexley homeowners and rental owners rely on us for on-time cans, spotless bins and quick bulk pickups.",
  },
];

export function findCityByZip(zip: string) {
  return cities.find((c) => c.zips.includes(zip));
}

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}
