// Service-area pages. Each entry generates /service-area/<slug> and feeds the ZIP checker.
// TODO: confirm with the client which of these areas they actually serve at launch.

export type City = {
  slug: string;
  name: string;
  county: string;
  zips: string[];
  areas: string[];
  intro: string;
  /** Local trash-day facts from the city's own pages. Only add facts with an official source. */
  trash?: TrashInfo;
};

export type TrashInfo = {
  /** Who hauls residential trash, e.g. "Rumpke, under contract with the City of Dublin". */
  collector: string;
  /** One-sentence answer to "what day is trash pickup in <city>?" */
  pickupDay: string;
  /** Official tool or page for looking up an address's day, if the city has one. */
  lookup?: { label: string; url: string };
  /** Trash, recycling and yard waste frequency. */
  frequency: string;
  /** When cans may go out and when they must come back in. */
  setOut: string;
  holidays: string;
  bulk: string;
  carts: string;
  /** The city's official trash page that the facts come from. */
  source: { label: string; url: string };
  /** Month the facts were last checked against the source, e.g. "November 2026". */
  checked: string;
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
    trash: {
      collector: "City of Columbus crews (Department of Public Service, Division of Refuse Collection). There's no private hauler contract.",
      pickupDay: "It depends on your address. Most Columbus homes are assigned a color (navy, pink, ruby, gold or gray), and the color sets the day. Routes were rebalanced in September 2025 and about half of households changed days, so check yours again if you haven't since.",
      lookup: { label: "Find My Collection Day (columbus.gov)", url: "https://www.columbus.gov/Services/Trash-Recycling-Bulk-Collection/Find-My-Collection-Day" },
      frequency: "Trash and recycling are collected weekly. Yard waste is every other week, by Zone A or Zone B.",
      setOut: "Carts can go out after 6 p.m. the night before and must be at the curb by 6 a.m. on collection day. They have to be pulled back by 2 p.m. the next day.",
      holidays: "There's no collection on city-observed holidays. Trash moves one day later for the rest of a holiday week, and recycling and yard waste slide a day if the holiday lands on or before your day.",
      bulk: "Bulk pickup is free but must be scheduled first through 311 (online or 614-645-3111).",
      carts: "The city provides a 96-gallon trash cart and a 64-gallon recycling cart, both tied to your address.",
      source: { label: "City of Columbus: Trash, Recycling & Bulk Collection", url: "https://www.columbus.gov/Services/Trash-Recycling-Bulk-Collection" },
      checked: "November 2026",
    },
  },
  {
    slug: "dublin",
    name: "Dublin",
    county: "Franklin, Delaware & Union Counties",
    zips: ["43016", "43017"],
    areas: ["Bridge Park", "Historic Dublin", "Muirfield Village", "Tartan West"],
    intro:
      "Dublin neighborhoods take curb appeal seriously. We keep cans out of sight until pickup and back where they belong right after, so your street always looks its best.",
    trash: {
      collector: "Rumpke, under contract with the City of Dublin. The city pays for residential service.",
      pickupDay: "Trash and recycling are picked up every Wednesday citywide, and yard waste every Monday, year-round.",
      lookup: { label: "City of Dublin: Trash & Recycling", url: "https://dublinohiousa.gov/city-services/trash-and-recycling-collection/" },
      frequency: "Trash, recycling and yard waste are all collected weekly.",
      setOut: "Carts must be at the road by 7 a.m. Wednesday (7 a.m. Monday for yard waste) and brought back in promptly after pickup. Between pickups, Dublin asks that containers be kept indoors where possible, or screened from view if they're stored outside.",
      holidays: "Holiday weeks slide by a day. After Memorial Day, for example, yard waste moved to Tuesday and trash and recycling to Thursday. Check the city's yearly schedule.",
      bulk: "Schedule bulk items through the GoDublin app. Appliances with refrigerant (CFCs) are arranged with Rumpke for a fee.",
      carts: "Dublin doesn't provide carts. You can use your own containers (50 lb limit each) or lease a cart from Rumpke.",
      source: { label: "City of Dublin: Trash & Recycling Collection", url: "https://dublinohiousa.gov/city-services/trash-and-recycling-collection/" },
      checked: "November 2026",
    },
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
      "Grove City homeowners and property managers use us for reliable trash day help and doorstep valet trash for apartment communities.",
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
    trash: {
      collector: "Local Waste Services, under contract with the City of Upper Arlington. Trash, recycling, yard waste and most bulk items are covered by one city fee, billed twice a year.",
      pickupDay: "Monday through Thursday, depending on your zone. Zone 1 is Monday, Zone 2 Tuesday, Zone 3 Wednesday and Zone 4 Thursday. The city describes each zone's streets on its trash page.",
      lookup: { label: "Upper Arlington trash zones (upperarlingtonoh.gov)", url: "https://www.upperarlingtonoh.gov/318/Trash-Recycling" },
      frequency: "Trash, recycling and yard waste are collected on the same day. Opt-in food waste goes out that day too.",
      setOut: "Containers go out between 6 p.m. the night before and 7 a.m. on collection day, on the grass at the curb (not in the street) and at least 3 feet apart. They must be off the curb by 7 a.m. the next day. Between pickups the city requires them to be out of view from the street: in a garage or shed, or screened behind a fence or landscaping.",
      holidays: "Some holidays push collection back one day for that week only. A holiday on a Friday, Saturday or Sunday causes no delay.",
      bulk: "Most bulk items go out on your regular day without scheduling. Wrap mattresses and upholstered furniture in plastic. Extra-large items need to be scheduled and may cost extra.",
      carts: "Local Waste Services provides and owns a grey trash cart and a blue recycling cart.",
      source: { label: "City of Upper Arlington: Trash & Recycling", url: "https://www.upperarlingtonoh.gov/318/Trash-Recycling" },
      checked: "November 2026",
    },
  },
  {
    slug: "worthington",
    name: "Worthington",
    county: "Franklin County",
    zips: ["43085"],
    areas: ["Old Worthington", "Colonial Hills", "Rush Creek", "Worthington Estates"],
    intro:
      "Worthington residents count on us for on-time cans and tidy curbs every week, all handled by a local team.",
    trash: {
      collector: "Local Waste Services, under contract with the City of Worthington. Residents aren't billed directly.",
      pickupDay: "Every Friday, citywide, between 6 a.m. and 6 p.m.",
      frequency: "Trash, recycling and yard waste are all collected weekly on Friday.",
      setOut: "City ordinance says nothing goes out before 6 a.m. Thursday, everything must be out by 6 a.m. Friday, and empty containers must be back in by 6 p.m. Saturday. Containers can't be stored in the front yard.",
      holidays: "When a holiday falls on a weekday, that week's pickup moves to Saturday. Weekend holidays don't change Friday pickup.",
      bulk: "Bulk items go out with Friday trash. Call the city ahead at 614-431-2425, and wrap mattresses and upholstered furniture in plastic.",
      carts: "The city provides one 65-gallon recycling cart. For trash, use your own cans or bags (35-gallon minimum, under 50 lb) or lease a 95-gallon cart from Local Waste Services.",
      source: { label: "City of Worthington: Solid Waste Collection", url: "https://www.worthington.org/302/Solid-Waste-Collection" },
      checked: "November 2026",
    },
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
    trash: {
      collector: "Rumpke serves the City of Powell. New residents set up service directly with Rumpke (1-800-828-8171). A Powell 43065 mailing address can also be in Liberty, Concord or Orange Township, which have their own arrangements, so check the city's address tool.",
      pickupDay: "Every Tuesday, throughout the City of Powell.",
      lookup: { label: "City of Powell address check", url: "https://www.cityofpowell.us/Residents/Address-Check-Tool" },
      frequency: "Trash, recycling and yard waste are all collected weekly on Tuesday.",
      setOut: "Containers must be out no later than 7 a.m. on pickup day and back at the house by the morning after.",
      holidays: "If a holiday falls on a Monday or Tuesday, collection moves to Wednesday that week, then the normal schedule resumes.",
      bulk: "Bulk items such as appliances, carpet and furniture go out on Tuesday. Schedule with Rumpke at least 24 hours ahead.",
      carts: "Rumpke provides a 95-gallon recycling container. You can rent a 95-gallon trash cart from Rumpke or use your own cans or bags.",
      source: { label: "City of Powell: Trash, Recycling & Yard Waste", url: "https://www.cityofpowell.us/Residents/Public-Service-Requests/Trash-Recycling-and-Yard-Waste" },
      checked: "November 2026",
    },
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
    trash: {
      collector: "City of Delaware Public Works.",
      pickupDay: "Monday through Friday, depending on your address. Look it up on the city's Refuse Collection Map, call 740-203-1810, or scan the QR code on your cart lid.",
      lookup: { label: "Delaware Refuse Collection Map", url: "https://codgis.maps.arcgis.com/apps/instant/lookup/index.html?appid=deefc01bfe8e4b86b37dd3281e06c9e7" },
      frequency: "Trash and recycling are collected weekly on the same day. Yard waste is also on your trash day from mid-April to mid-December, and in January.",
      setOut: "Carts must be at the curb by 5 a.m., no more than 24 hours early, and off the public right-of-way within 24 hours after collection.",
      holidays: "Some holidays push collection back a day for the rest of the week. When a holiday falls on a Friday, Friday routes move to Saturday.",
      bulk: "Bulk pickup is paid and scheduled ahead with the city, usually on Thursdays.",
      carts: "The city provides a blue trash cart (32 or 96 gallons) and a green recycling cart (35 or 65 gallons). Service is billed on your utility bill.",
      source: { label: "City of Delaware: Refuse & Recycling Collection", url: "https://www.cityofdelawareoh.gov/government/departments/public-works/refuse-and-recycling-collection" },
      checked: "November 2026",
    },
  },
  {
    slug: "reynoldsburg",
    name: "Reynoldsburg",
    county: "Franklin, Licking & Fairfield Counties",
    zips: ["43068"],
    areas: ["Olde Reynoldsburg", "Huron Park", "Taylor Square", "Brice"],
    intro:
      "Reynoldsburg homes and multifamily properties use us for scheduled can service and doorstep valet trash.",
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
      "Bexley homeowners and rental owners rely on us for on-time cans and cans back out of sight right after pickup.",
    trash: {
      collector: "Rumpke, under contract with the City of Bexley. Refuse is billed quarterly on the water bill. Bexley is part of a regional bid for a new contract starting January 2027, so check the city's page for updates.",
      pickupDay: "Every Monday, citywide, for trash, recycling, yard waste and bulk items. Homes with an alley put trash and bulk items in the alley, and recycling and yard waste on the tree lawn.",
      frequency: "Trash, recycling and yard waste are all collected on Monday.",
      setOut: "The city says to set trash and recycling out the night before collection, with everything out by 7 a.m. Monday.",
      holidays: "Bexley follows Rumpke's holiday schedule, so check it on holiday weeks.",
      bulk: "Bulk items go out on Monday. Call Rumpke at least 48 hours ahead (1-800-828-8171). Mattresses and upholstered furniture must be sealed in plastic, and fees may apply.",
      carts: "Residents supply their own containers. Rumpke takes up to six 32-gallon cans or bags, 50 lb or less each. The city also sells 96-gallon trash toters.",
      source: { label: "City of Bexley: Trash", url: "https://bexley.org/trash/" },
      checked: "November 2026",
    },
  },
];

export function findCityByZip(zip: string) {
  return cities.find((c) => c.zips.includes(zip));
}

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}
