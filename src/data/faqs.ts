export type Faq = { q: string; a: string };

export const residentialFaqs: Faq[] = [
  {
    q: "How does trash can to curb service work?",
    a: "Tell us your address, collection days and where your cans live. The evening before pickup, a Buckeye team member rolls your cans to the curb. After the truck comes through, we return them to their spot. You get a text with a photo each time.",
  },
  {
    q: "Do I need to be home?",
    a: "No. Most customers are at work, asleep or out of town. If your cans are behind a gate or in a garage, add the access code or keypad details when you sign up and we'll handle the rest.",
  },
  {
    q: "What happens on holiday weeks?",
    a: "When your hauler shifts pickup for a holiday, we shift with them. You don't need to do anything.",
  },
  {
    q: "Can I pause service while I'm on vacation?",
    a: "Yes, and that's when many customers need us most. We'll keep rolling your cans out so your home looks lived-in. You can also skip a week anytime with a quick text or email.",
  },
  {
    q: "Is there a contract?",
    a: "No long-term contracts. Your first two weeks are free, and after that you can cancel anytime with notice before your next billing date.",
  },
  {
    q: "Who is coming to my property?",
    a: "Every Buckeye team member is background-checked and trained, and every visit is photo-documented.",
  },
];

export const valetFaqs: Faq[] = [
  {
    q: "What is valet trash?",
    a: "Valet trash is doorstep trash collection for apartment communities. Residents set a bagged trash container outside their door during a set window, and our porters collect it and take it to the compactor or dumpster.",
  },
  {
    q: "How many nights a week do you collect?",
    a: "Most communities choose 5 nights a week (Sunday through Thursday), but we build the schedule around your property, from 3 to 7 nights.",
  },
  {
    q: "Do you provide resident containers?",
    a: "Yes. We can supply branded doorstep containers and resident welcome flyers, or work with containers you already have.",
  },
  {
    q: "How do you handle violations?",
    a: "Porters log rule violations, like trash left outside the window or unbagged waste, with photos. Your office gets a nightly report so you can follow up with residents.",
  },
  {
    q: "How is valet trash priced?",
    a: "Pricing is per unit, per month, and depends on unit count, building layout and nights of service. Request a proposal and we'll walk your property and send a quote within 48 hours.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve apartment communities across Greater Columbus, including Dublin, Hilliard, Westerville, Grove City, Gahanna, Lewis Center, Reynoldsburg and more.",
  },
];

export const generalFaqs: Faq[] = [
  ...residentialFaqs,
  {
    q: "Do you clean trash bins?",
    a: "Yes. We pressure-wash, sanitize and deodorize your bins right at the curb using hot water, then leave them to dry. You can book one-time, monthly or quarterly cleanings.",
  },
  {
    q: "What junk do you haul away?",
    a: "Furniture, mattresses, appliances, yard waste, construction debris, move-out leftovers, garage and basement cleanouts. We can't take hazardous materials such as paint, chemicals or propane tanks.",
  },
  ...valetFaqs.slice(0, 3),
];
