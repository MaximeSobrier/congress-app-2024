const IAB : any = {
  'IAB1': {
    name: 'Arts & Entertainment',
    id: "WEB1",
    includes: "festival, fair, calligraphy, frames",
    children: {
      'IAB1-1': {
        id: "WEB1-1",
        name: 'Books & Literature',
        includes: "libraries, comic books, grammar, vocabulary",
      },
      'IAB1-3':	{
        id: "WEB1-2",
        name: 'Fine Art',
        includes: "painting, sculpture, tapestry",
      },
      'IAB1-4':	{
        id: "WEB1-3",
        name: 'Humor',
        includes: "",
      },
      'IAB1-5':	{
        id: "WEB1-4",
        name: 'Movies & Television',
        includes: "movie theater",
      },
      'IAB1-6':	{
        id: "WEB1-5",
        name: 'Music', 
        includes: "audio equipment, bands, instruments",
      },
      'IAB1-7':	{
        name: 'Television', 
        merge: 'IAB1-5',
        includes: "TV series, TV shows",
      },
      'IAB1-10':	{
        name: 'Podcast', 
        merge: 'IAB1-109',
        hide: true,
      },
      'IAB1-100':	{
        id: "WEB1-6",
        name: 'Philosophy',
        includes: "philosophy of science",
      },
      'IAB1-101':	{
        id: "WEB1-7",
        name: 'Animation',
      },
      'IAB1-102': {
        id: "WEB1-8",
        name: 'Architecture',
      },
      'IAB1-103':	{
        name: 'Sculpture',
        merge: 'IAB1-3',
      },
      'IAB1-106': {
        id: "WEB1-9",
        name: 'Performing Arts',
        includes: "circus, comedy, dance, puppetry, ballet, theater",
        includesNot: "magic, humor",
      },
      'IAB1-107': {
        id: "WEB1-10",
        name: 'Artists & Celebrities',
      },
      'IAB1-108': {
        id: "WEB1-11",
        name: 'Video streaming',
      },
      'IAB1-109': {
        id: "WEB1-12",
        name: 'Audio streaming',
        includes: "audio books, live radio",
      },
      'IAB1-110': {
        name: 'Libraries',
        merge: 'IAB1-1',
      },
      'IAB1-111': {
        id: "WEB1-13",
        name: 'Galleries and Museums',
      },
      'IAB1-112': {
        name: 'Painting', 
        merge: 'IAB1-3',
      },
      'IAB1-113':	{
        name: 'Comic Books',
        merge: 'IAB1-1',
      },
      'IAB1-114':	{
        id: "WEB1-14",
        name: 'Drawing/Sketching',
        includes: "illustrator, infographics",
      },
      'IAB1-115':	{
        id: "WEB1-15",
        name: 'Magic & Illusion',
        includes: "hypnosis, mentalist, magicians",
      },
      'IAB1-116':	{
        id: "WEB1-16",
        name: 'Photography',
      },
      'IAB1-117':	{
        id: "WEB1-17",
        name:	'Radio',
      }
    }
  },
  'IAB2' : {
    id: "WEB2",
    name: 'Automotive',
    children: {
      'IAB2-1':	{
        id: "WEB2-1",
        name: 'Auto Parts',
        includes: "trailers, tires"
      },
      'IAB2-2':	{
        id: "WEB2-2",
        name: 'Auto Repair',
        includes: "car wash, maintenance, window tinting, towing"
      },
      'IAB2-3':	{
        id: "WEB2-3",
        name: 'Buying/Selling Cars',
        includes: "RV",
        includesNot: "motorcycle",
      },
      'IAB2-4':	{
        id: "WEB2-4",
        name: 'Car Culture',
        includes: "auto club, events, museums",
      },
      'IAB2-15':	{
        id: "WEB2-5",
        name: 'Motorcycles',
        includes: "parts, scooters"
      },
      'IAB2-16':	{
        name: 'Off-Road Vehicles',
        merge: "IAB2-102",
      },
      'IAB2-21':	{
        name: 'Trucks & Accessories',
        merge: "IAB2-104",
      },
      'IAB2-23':	{
        id: "WEB2-6",
        name: 'Trains & Railroads',
      },
      'IAB2-100': {
        id: "WEB2-7",
        name: 'Aviation',
        includes: "local airport, helicopters, planes, parachutes, gliders, drones",
      },
      'IAB2-101': {
        id: "WEB2-8",
        name: 'Boats',
        includes: "marina",
      },
      'IAB2-102': {
        id: "WEB2-9",
        name: 'Cars & RVs',
      },
      'IAB2-104': {
        id: "WEB2-10",
        name: 'Other Vehicles',
        includes: "Snowmobile, golf carts, atv, utv, tractor, jet ski",
      }
    }
  },
  'IAB3': {
    id: "WEB3",
    name: 'Business & Corporate',
    children: {
      'IAB3-2':	{
        id: "WEB3-1",
        name: 'Agriculture and Forestry',
        includes: "farm, tree care, live stock",
      },
      'IAB3-3':	{
        id: "WEB3-2",
        name: 'Biotech, Biomedical & Healthcare',
        includes: "medical research, stair lift, clinical trials, public health",
      },
      'IAB3-4':	{
        id: "WEB3-3",
        name: 'SaaS & Business Software',
        includes: "status page, CMS",
      },
      'IAB3-5':	{
        id: "WEB3-4",
        name: 'Construction & Maintenance',
        includes: "locksmith, pest control, scaffolding, construction machines, HVAC, pool, noise reduction building/removal, commercial painting, roofing, playground",
      },
      'IAB3-8':	{
        id: "WEB3-5",
        name: 'Green Solutions',
        includes: "recycling, renewable energy, waste management",
      },
      'IAB3-9':	{
        id: "WEB3-6",
        name: 'Human Resources',
        includes: "training, payroll, background check, team building",
      },
      'IAB3-10': {
        id: "WEB3-7",
        name: 'Logistics',
        includes: "transport, packaging, storage, moving, import/export, junk removal",
      },
      'IAB3-11':	{
        id: "WEB3-8",
        name: 'Marketing',
        includes: "seo, ad networks",
      },
      'IAB3-100':	{
        id: "WEB3-9",
        name: 'Accounting',
        includes: "inventory, CPA, tax preparator, financial statements, time tracking",
      },
      'IAB3-101':	{
        id: "WEB3-10",
        name: 'Aerospace & Aeronautics',
        includes: "",
      },
      'IAB3-102':	{
        id: "WEB3-11",
        name: 'Telecommunications',
        includes: "internet provider, network cables, antennas, networking companies, GPS tracking",
      },
      'IAB3-103':	{
        id: "WEB3-12",
        name: 'Energy',
        includes: "",
      },
      'IAB3-104':	{
        id: "WEB3-13",
        name: 'Translation',
        includes: "",
      },
      'IAB3-105': {
        id: "WEB3-14",
        name: 'Arts and Entertainment',
        includes: "music instruments making, county fair, voice actors",
      },
      'IAB3-106': {
        id: "WEB3-15",
        name: 'Business Goods & Services', 
        includes: "office services, security, point of sale, colocation, public speaking, security, fire alarms, co-working",
      },
      'IAB3-107': {
        id: "WEB3-16",
        name: 'Food and Aliments',
        includes: "farmer market, food store, food delivery, bee keeping",
      },
      'IAB3-108': {
        name: 'Healthcare', 
        merge: 'IAB3-3'
      },
      'IAB3-109': {
        id: "WEB3-17",
        name: 'Industrial Goods and Services',
        includes: "metal, chemicals",
      },
      'IAB3-110': {
        id: "WEB3-18",
        name: 'Publishing and Printing',
        includes: "signs, t-shirt printing, envelopes, business cards, engraving, banners",
      },
      'IAB3-111': {
        id: "WEB3-19",
        name: 'Textiles and Nonwovens',
        includes: "leather, sewing, flags",
      },
      'IAB3-112': {
        id: "WEB3-20",
        name: 'Consumer Goods and Services', 
        includes: "pool service, plumbing, trophies",
      },
      'IAB3-113': {
        id: "WEB3-21",
        name: 'Electronics and Electrical',
        includes: "battery, meters & instruments, laser, automation, sensors",
      },
      'IAB3-114': {
        id: "WEB3-22",
        name: 'Hospitality', 
        includes: "food service, hotels, travel, maids, conferences, cleaning, event creation",
      },
      'IAB3-115': {
        id: "WEB3-23",
        name: 'Management',
        includes: "consulting, transformations, leadership, incubator, coaching, compliance, business plan, entrepreneurship, engineering",
      },
      'IAB3-116': {
        id: "WEB3-24",
        name: 'Materials',
        includes: "paper, filters, abrasives, steel, grinding, steel, paint",
      },
      'IAB3-117': {
        id: "WEB3-25",
        name: 'Opportunities',
        includes: "franchise, inventions, home-based work, MLM, affiliates, vending machines",
      },
      'IAB3-118': {
        id: "WEB3-26",
        name: 'Mining and Drilling',
        includes: "mines",
      },
      'IAB3-119': {
        id: "WEB3-27",
        name: 'Computer and Internet',
        includes: "",
      },
      'IAB3-120': {
        id: "WEB3-28",
        name: 'Chamber of Commerce & Business Association',
        includes: "business networks, industry associations, downtown association",
      },
    }
  },
  'IAB4': { // 1,984
    name: 'Careers',
    id: "WEB4",
    includes: "salary listings, ethics line",
    children: {
      'IAB4-1': {
        name: 'Career Planning', 
        merge: 'IAB4-11',
      },
      'IAB4-5':	{
        id: "WEB4-1",
        name: 'Job Search', 
        includes: "career page, job boards",
      },
      'IAB4-6': {
        name: 'Resume Writing & Advice',
        includes: "resume templates",
        merge: 'IAB4',
      },
      'IAB4-8': {
        // id: "WEB4-2",
        name: 'Scholarships',
        merge: 'IAB4',
      },
      'IAB4-11': {
        id: "WEB4-3",
        name: 'Career Advice',
      },
      'IAB4-100': {
        id: "WEB4-4",
        name: 'Labor Movement & Rights',
        includes: "unions, employment layers",
      }
    }
  },
  'IAB5':	{ // 23,570
    name: 'Education',
    id: "WEB5",
    includesNot: "daycare, pre school",
    children: {
      'IAB5-1':	{
        id: "WEB5-1",
        name: 'K-12 Education',
        includes: "elementary school, middle school, high school"
      },
      'IAB5-3': 	{
        name: 'Art History',
        merge: 'IAB5-14',
      },
      'IAB5-4':		{
        id: "WEB5-2",
        name: 'College Administration',
        includes: "admission office, college board"
      },
      'IAB5-5':		{
        id: "WEB5-3",
        name: 'College Life',
        includes: "alumni, student association, fraternity, sorority"
      },
      'IAB5-6':		{
        id: "WEB5-4",
        name: 'Distance Learning',
      },
      'IAB5-7':		{
        id: "WEB5-5",
        name: 'English as a 2nd Language',
      },
      'IAB5-8':	{
        id: "WEB5-6",
        name:	'Language Learning',
        includesNot: "english",
      },
      'IAB5-9':	{
        id: "WEB5-7",
        name:'College and University',
      },
      'IAB5-10': {
        id: "WEB5-8",
        name:'Homeschooling',
      },
      'IAB5-11': {
        id: "WEB5-9",
        name: 'Homework & Study Tips',
        includes: "test preparation, tests",
      },
      'IAB5-13':	{
        id: "WEB5-10",
        name:	'Private School',
      },
      'IAB5-14':	{
        id: "WEB5-11",
        name:	'Special Education',
        includes: "driving, certifications"
      },
      'IAB5-15':	{
        name: 'Studying Business',
        merge: 'IAB5-14',
      },
    }
  },
  'IAB6': { 
    name: 'Family & Parenting',
    id: "WEB6",
    children: {
      'IAB6-1':	{
        id: "WEB6-1",
        name: 'Adoption',
        includes: "foster care, adoption, orphans"
      },
      'IAB6-2':	{
        name: 'Babies & Toddlers',
        merge: 'IAB6-5',
      },
      'IAB6-3':	{
        id: "WEB6-2",
        name: 'Daycare & Pre School',
      },
      'IAB6-4': {
        name: 'Family Internet',
        merge: 'IAB100-19',
      },
      'IAB6-5':	{
        id: "WEB6-3",
        name: 'Parenting, Babies & Toddlers',
        includes: "diapers, kids activities, summer camp"
      },
      'IAB6-6': {
        name: 'Parenting teens',
        merge: 'IAB6-5',
      },
      'IAB6-7':	{
        id: "WEB6-4",
        name: 'Pregnancy', 
      },
      'IAB6-8':	{
        name: 'Special Needs Kids',
        merge: 'IAB6-5',
      },
      'IAB100-19': {
        id: "WEB6-5",
        name: 'For Children',
      },
    }
  },
  'IAB7': { // 27,838
    name: 'Health & Fitness',
    id: "WEB7",
    includes: "plastic surgery, diseases, fire services, nephology, podiatry, urology, neurological_ disorders, support groups, rare diseases, orphan diseases, safety",
    children: {
      'IAB7-1':	{
        id: "WEB7-1",
        name: 'Exercise',
        includes: "pilates",
      },
      'IAB7-3':	{
        id: "WEB7-2",
        name:	'AIDS/HIV',
      },
      'IAB7-4':	{
        id: "WEB7-3",
        name:	'Allergies',
      },
      'IAB7-5':	{
        id: "WEB7-4",
        name:	'Alternative Medicine',
        includes: "chiropractor, acupuncture, herbs",
      },
      'IAB7-8':	{
        id: "WEB7-5",
        name:	'Autism & PDD',
      },
      'IAB7-9':	{
        name: 'Bipolar Disorder',
        merge: 'IAB7-37',
      },
      'IAB7-10':	{
        name:	'Brain Tumor',
        merge: 'IAB7',
      },
      'IAB7-11':	{
        id: "WEB7-6",
        name:	'Cancer',
      },
      'IAB7-14':	{
        name:	'Chronic Pain',
        merge: 'IAB7',
      },
      'IAB7-16':	{
        id: "WEB7-7",
        name:	'Hearing & Deafness', 
      },
      'IAB7-17':	{
        id: "WEB7-8",
        name:	'Dental Care',
      },
      'IAB7-19':	{
        id: "WEB7-9",
        name:	'Dermatology',
        includes: "hair loss",
      },
      'IAB7-20':	{
        id: "WEB7-10",
        name:	'Diabetes',
      },
      'IAB7-21':	{
        id: "WEB7-11",
        name:	'Epilepsy',
      },
      'IAB7-23':	{
        name:	'Headaches/Migraines', 
        merge: 'IAB7',
      },
      'IAB7-24':	{
        id: "WEB7-12",
        name:	'Heart Disease',
        includes: "cardiologist, cholesterol, veins",
      },
      'IAB7-27':	{
        id: "WEB7-13",
        name:	'Gastroenterology',
        includes: "IBS, Crohn's disease, guts, hepatitis, kidney",
      },
      'IAB7-28':	{
        id: "WEB7-14",
        name:	'Abuse Support',
        includes: "rape, false accusations, domestic violence"
      },
      'IAB7-30':	{
        name: 'Infertility',
        merge: 'IAB7-39',
      },
      'IAB7-31':	{
        id: "WEB7-15",
        name:	'Men\'s Health',
      },
      'IAB7-32':	{
        id: "WEB7-16",
        name:	'Nutrition',
      },
      'IAB7-33':	{
        name:	'Orthopedics',
        merge: 'IAB7',
      },
      'IAB7-35':	{
        id: "WEB7-17",
        name:	'Pediatrics', 
      },
      'IAB7-36':	{
        id: "WEB7-18",
        name:	'Physical Therapy',
        includes: "massage, chiropractor",
      },
      'IAB7-37':	{
        id: "WEB7-19",
        name:	'Psychology, Psychiatry & Mental Health',
        includes: "counselling, self-help",
      },
      'IAB7-38':	{
        id: "WEB7-20",
        name:  'Senior Health',
      },
      'IAB7-39':	{
        id: "WEB7-21",
        name:	'Sexuality',
        includes: "condoms"
      },
      'IAB7-40':	{
        id: "WEB7-22",
        name:	'Sleep Disorders',
      },
      'IAB7-42':	{
        id: "WEB7-23",
        name:	'Substance Abuse',
        includes: "drugs, rehab, alcohol abuse",
        includesNot: "tobacco",
      },
      'IAB7-43':	{
        name:	'Thyroid Disease',
        merge: 'IAB7',
      },
      'IAB7-44':	{
        id: "WEB7-24",
        name:	'Weight Loss',
        includes: "diets",
      },
      'IAB7-45':	{
        id: "WEB7-25",
        name:	'Women\'s Health',
      },
      'IAB7-100':	{
        id: "WEB7-26",
        name:	'Yoga & Meditation',
      },
      'IAB7-101':	{
        id: "WEB7-27",
        name: 'Sex Education',
      },
      'IAB7-102':	{
        id: "WEB7-28",
        name: 'Hospitals, Clinics and Medical Services',
        includes: "ambulances, doctors"
      },
      'IAB7-103':	{
        id: "WEB7-29",
        name: 'Pharmacy & Drugs',
      },
      'IAB7-104':	{
        id: "WEB7-30",
        name: 'Eye Care',
        includes: "glasses, contacts"
      },
    }
  },
  'IAB8': { // 3,175
    name: 'Food & Drink',
    id: "WEB8",
    includes: "drinks",
    children: {
      'IAB8-1':	{
        name: 'American Cuisine',
        merge: 'IAB8-7',
        hide: true,
      },
      'IAB8-2':	{
        id: "WEB8-1",
        name:	'Barbecues & Grilling',
      },
      'IAB8-3':	{
        name:	'Cajun/Creole',
        merge: 'IAB8-7',
        hide: true,
      },
      'IAB8-4':	{
        name:	'Chinese Cuisine',
        merge: 'IAB8-7',
        hide: true,
      },
      'IAB8-5':	{
        name:	'Cocktails & Beer',
        merge: 'IAB8-100',
      },
      'IAB8-6':	{
        id: "WEB8-2",
        name:	'Coffee & Tea', // 117
      },
      'IAB8-7':	{
        id: "WEB8-3",
        name:	'Cuisine-Specific',
        includes: "cuisine instruments, cooking",
      },
      'IAB8-8':	{
        id: "WEB8-4",
        name:	'Desserts & Baking', 
      },
      'IAB8-9':	{
        id: "WEB8-5",
        name:	'Bars and Restaurants',
        includes: "fast food, food delivery, catering, coffee shop",
      },
      'IAB8-10':	{
        name:	'Food Allergies',
      },
      'IAB8-11':	{
        name:	'French Cuisine', 
        merge: 'IAB8-7',
        hide: true,
      },
      'IAB8-12':	{
        name:	'Health & Lowfat Cooking', 
        merge: 'IAB7-32',
      },
      'IAB8-13':	{
        name:	'Italian Cuisine', 
        merge: 'IAB8-7',
        hide: true,
      },
      'IAB8-14':	{
        name:	'Japanese Cuisine',
        merge: 'IAB8-7',
        hide: true
      },
      'IAB8-15':	{
        name:	'Mexican Cuisine',
        merge: 'IAB8-7',
        hide: true
      },
      'IAB8-16':	{
        id: "WEB8-6",
        name:	'Vegan & Vegetarian',
        includesNot: "recipes",
      },
      'IAB8-17':	{
        name:	'Vegetarian',
        merge: 'IAB8-16',
      },
      'IAB8-18':	{
        name:	'Wine',
        merge: 'IAB8-100',
      },
      'IAB8-100':	{
        id: "WEB8-7",
        name:	'Alcohol',
      },
      'IAB8-101':	{
        id: "WEB8-8",
        name:	'Recipes',
      },
    }
  },
  'IAB9': { // 3,178
    name: 'Hobbies & Interests',
    id: "WEB9",
    includes: "geocaching, meta detecting, treasure hunt, detective (as hobby), DIY, drinking games, urban exploration, abandoned places",
    children: {
      'IAB9-2':	{
        id: "WEB9-1",
        name: 'Arts & Crafts',
        includes: "knitting, coloring, fabrics",
      },
      'IAB9-4':	{
        name:	'Birdwatching',
        merge: 'IAB16-2',
        hide: true,
      },
      'IAB9-5':	{
        id: "WEB9-2",
        name:	'Board Games & Puzzles',
        includes: "sudoku, dominoes, air hockey, table hockey",
      },
      'IAB9-7':	{
        id: "WEB9-3",
        name:	'Card Games',
      },
      'IAB9-8':	{
        id: "WEB9-4",
        name:	'Chess',
      },
      'IAB9-10':	{
        id: "WEB9-5",
        name:	'Collecting',
        includes: "antiques"
      },
      'IAB9-13':	{
        id: "WEB9-6",
        name:	'Writing',
      },
      'IAB9-14':	{
        id: "WEB9-7",
        name:	'Genealogy',
      },
      'IAB9-24':	{
        id: "WEB9-8",
        name:	'Amateur Radio',
      },
      'IAB9-25':	{
        id: "WEB9-9",
        name:	'Roleplaying Games',
      },
      'IAB9-29':	{
        name:	'Stamps & Coins',
        merge: 'IAB9-10',
      },
      'IAB9-30':	{
        id: "WEB9-10",
        name:	'Video & Computer Games',
      },
      'IAB9-100':	{
        id: "WEB9-11",
        name:	'Toys & Models',
        includes: "miniatures, kites, models",
      },
    }
  },
  'IAB10': {
    name: 'Home & Garden',
    id: "WEB10",
    empty: true,
    children: {
      'IAB10-1': {
        id: "WEB10-5",
        name: 'Appliances',
        // merge: 'IAB10-7',
        includes: "fridge, washer, dryer"
      },
      'IAB10-4': {
        id: "WEB10-1",
        name:	'Gardening & Landscaping',
        includes: "outdoor, poultry raising",
      },
      'IAB10-5': {
        id: "WEB10-2",
        name:	'Home Repair, Remodeling & Construction',
        includes: "painting, windows, doors, flooring, carpets",
      },
      'IAB10-7': {
        id: "WEB10-3",
        name:	'Interior',
        includes: "florists, lights, candles, kitchen, rugs, bath, interior design, decoration"
      },
      'IAB10-8': {
        name:	'Landscaping',
        merge: 'IAB10-4',
      },
      'IAB10-9': {
        name: 'Remodeling & Construction',
        merge: 'IAB10-5',
      },
      'IAB10-100': {
        id: "WEB10-4",
        name: 'Tools',
        includes: "nails, fasteners, screws, saws",
      },
      'IAB10-101': {
        name: 'Furniture',
        includes: "sofa, outdoor furniture, office furniture, mattress",
        // merge: 'IAB10-7',
      },
    }
  },
  'IAB11': {
    name: 'Law, Gov\'t & Politics',
    id: "WEB11",
    empty: true,
    merge: 'IAB11-3',
    children: {
      'IAB11-1': {
        id: "WEB11-1",
        name: 'Immigration',
        includes: "refugees",
      },
      'IAB11-2': {
        id: "WEB11-2",
        name:	'Legal Issues',
        includes: "lawyers, attorneys, notary, patents, intellectual property"
      },
      'IAB11-3': {
        id: "WEB11-3",
        name:	'National, State & Local Government',
        includes: "police, city, county, international instances"
      },
      'IAB11-4': {
        id: "WEB11-4",
        name:	'Politics',
        includes: "political parties"
      },
      'IAB11-100': {
        id: "WEB11-5",
        name:	'Military',
    },
    }
  },
  'IAB12': {
    name: 'News',
    id: "WEB12",
    children: {
      'IAB12-3': {
        id: "WEB12-1",
        name: 'Local News',
      }
    }
  },
  'IAB13': {
    name: 'Finance',
    id: "WEB13",
    children: {
      'IAB13-2': {
        id: "WEB13-1",
        name: 'Credit/Debt & Loans',
      },
      'IAB13-4': {
        id: "WEB13-2",
        name:	'Financial Planning',
      },
      'IAB13-6': {
        id: "WEB13-3",
        name:	'Insurance', 
      },
      'IAB13-7': {
        id: "WEB13-4",
        name:	'Investing', 
        includes: "stocks",
      },
      'IAB13-10': {
        name:	'Retirement Planning',
        merge: 'IAB13-4',
      },
      'IAB13-12': {
        name:	'Tax & Estate Planning',
        merge: 'IAB13-4',
      },

      'IAB13-100': {
        id: "WEB13-5",
        name: 'Banking Services',
        includesNot: "credit cards"
      },
      'IAB13-101': {
        id: "WEB13-6",
        name: 'Payment System',
        includes: "credit cards"
      },
    }
  },
  'IAB14': {
    name: 'Society',
    id: "WEB14",
    children: {
      'IAB14-1': {
        id: "WEB14-1",
        name: 'Dating',
      },
      'IAB14-2': {
        name:	'Divorce Support',
        merge: 'IAB14',
      },
      'IAB14-5': {
        name:	'Senior Living',
        merge: 'IAB7-38',
      },
      'IAB14-6': {
        id: "WEB14-2",
        name:	'Teens',
        includes: "children, children activities",
      },
      'IAB14-7': {
        id: "WEB14-3",
        name:	'Weddings',
        includes: "bachelor, bachelorette, marriage"
      },
      'IAB14-8': {
        id: "WEB14-4",
        name:	'Ethnic Specific', 
      },
      'IAB14-100': {
        id: "WEB14-5",
        name: 'Subcultures',
        includes: "gothic, body hacking, punk, hippie, bikers, nihilism, furry, cosplay",
      },
      'IAB14-101': {
        id: "WEB14-6",
        name: 'Death',
        includes: "suicide prevention, cemeteries, obituaries",
      },
      'IAB14-102': {
        id: "WEB14-7",
        name: 'Crime & Fraud',
        includes: "scam, terrorism"
      },
      'IAB14-103': {
        id: "WEB14-8",
        name: 'Philanthropy',
        includes: "donations, food bank"
      },
      'IAB14-104': {
        id: "WEB14-9",
        name: 'Rights',
        includes: "property rights, women rights, child labor, consumer protection",
      },
      'IAB14-105': {
        id: "WEB14-10",
        name: 'Organizations',
      },
      'IAB14-106': {
        id: "WEB14-11",
        name: 'Scouts',
      },
      'IAB14-107': {
        id: "WEB14-12",
        name: 'Freemasonry',
      },
      'IAB14-108': {
        id: "WEB14-13",
        name: 'Abortion',
        includes: "pro-life, pro-choice, abortion pills",
      },
      'IAB14-109': {
        id: "WEB14-14",
        name: 'Holidays & Parties',
        includes: "halloween, christmas",
      },
      'IAB14-110': {
        id: "WEB14-15",
        name: 'Disabled',
        includes: "disabilities",
      },
      'IAB100-2': {
        id: "WEB14-16",
        name: 'Conspiracy',
      }
    }
  },
  'IAB15': {
    name: 'Science & History',
    id: "WEB15",
    children: {
      'IAB15-2': {
        id: "WEB15-1",
        name: 'Biology',
      },
      'IAB15-3': {
        id: "WEB15-2",
        name:	'Chemistry',
      },
      'IAB15-4': {
        name:	'Geology',
        merge: 'IAB15-106',
      },
      'IAB15-6': {
        id: "WEB15-3",
        name:	'Physics',
        includes: "acoustics",
      },
      'IAB15-7': {
        id: "WEB15-4",
        name:	'Space/Astronomy',
      },
      'IAB15-8': {
        id: "WEB15-5",
        name:	'Geography',
      },
      'IAB15-9': {
        id: "WEB15-6",
        name:	'Botany',
      },
      'IAB15-10': {
        id: "WEB15-7",
        name:	'Weather',
      },
      'IAB15-100': {
        id: "WEB15-8",
        name: 'Environment',
        includes: "water resources, climate",
      },
      'IAB15-101': {
        id: "WEB15-9",
        name: 'Social Sciences',
        includes: "archeology",
      },
      'IAB15-102': {
        id: "WEB15-10",
        name: 'Reference Materials',
        includes: "standards",
      },
      'IAB15-103': {
        id: "WEB15-11",
        name: 'History',
        includes: "classical studies",
      },
      'IAB15-104': {
        name: 'Public Records and Directories', 
        merge: 'IAB15-102',
      },
      'IAB15-105': {
        id: "WEB15-12",
        name: 'Mathematics',
      },
      'IAB15-106': {
        id: "WEB15-13",
        name: 'Earth Sciences',
        includes: "earthquakes, fossils, oceanography",
      },
      'IAB15-107': {
        id: "WEB15-14",
        name: 'Civil & Mechanical Engineering',
        includes: "metallurgy, structural",
      },
      'IAB15-108': {
        id: "WEB15-15",
        name: 'Electrical & Electronics Engineering',
        includes: "robotics",
      },
      'IAB15-109': {
        id: "WEB15-16",
        name: 'Material Science',
        includes: "nanotechnology, materials",
      },
    },
  },
  'IAB16': {
    name: 'Animals & Pets',
    id: "WEB16",
    includes: "taxidermy",
    includesNot: "horses",
    children: {
      'IAB16-1': {
        id: "WEB16-1",
        name: 'Fish & Aquaria',
      },
      'IAB16-2': {
        id: "WEB16-2",
        name:	'Birds',
      },
      'IAB16-3': {
        id: "WEB16-3",
        name:	'Cats',
      },
      'IAB16-4': {
        name:	'Dogs',
      },
      'IAB16-5': {
        name: 'Large Animals',
        merge: 'IAB16',
        hide: true,
      },
      'IAB16-6': {
        id: "WEB16-4",
        name:	'Reptiles & Amphibians',
      },
      'IAB16-7': {
        id: "WEB16-5",
        name:	'Veterinary Medicine',
      },
      'IAB16-100': {
        id: "WEB16-6",
        name:	'Zoos & Aquariums',
      },
    }
  },
  'IAB17': {
    name: 'Sports',
    id: "WEB17",
    includes: "multisports, triathlon, arm wrestling, highland games, strongman, sky dive",
    children: {
      'IAB17-1': {
        name: 'Auto Racing',
        merge: 'IAB17-25',
      },
      'IAB17-2': {
        id: "WEB17-1",
        name: 	'Baseball',
      },
      'IAB17-3': {
        id: "WEB17-2",
        name: 	'Bicycling',
      },
      'IAB17-4': {
        id: "WEB17-3",
        name: 	'Bodybuilding',
        includes: "power lifting, olympic lifting, crossfit",
      },
      'IAB17-5': {
        id: "WEB17-4",
        name: 	'Boxing', 
      },
      'IAB17-6': {
        name: 	'Canoeing & Kayaking',
        merge: 'IAB17-102',
      },
      'IAB17-7': {
        id: "WEB17-5",
        name: 	'Cheerleading',
      },
      'IAB17-8': {
        id: "WEB17-6",
        name: 	'Climbing',
        includes: "mountaineering, mountain trekking",
      },
      'IAB17-9': {
        id: "WEB17-7",
        name: 	'Cricket', 
      },
      'IAB17-10': {
        id: "WEB17-8",
        name:	'Figure Skating',
        includes: "speed skate",
      },
      'IAB17-11': {
        name: 'Fly Fishing',
        merge: 'IAB17-32',
      },
      'IAB17-12': {
        id: "WEB17-9",
        name: 'Football', 
        includes: "American football",
        includesNot: "soccer",
      },
      'IAB17-13': {
        name: 'Freshwater Fishing',
        merge: 'IAB17-32',
      },
      'IAB17-14': {
        name: 'Game & Fish',
        merge: 'IAB17-32',
      },
      'IAB17-15': {
        id: "WEB17-10",
        name: 'Golf',
      },
      'IAB17-16': {
        name: 'Horse Racing',
        merge: 'IAB17-17',
      },
      'IAB17-17': {
        id: "WEB17-11",
        name: 'Horses',
      },
      'IAB17-18': {
        id: "WEB17-12",
        name: 'Hunting & Shooting',
        includes: "archery, airsoft",
      },
      'IAB17-19': {
        name: 'Inline Skating',
        merge: 'IAB17-110',
      },
      'IAB17-20': {
        id: "WEB17-13",
        name: 'Martial Arts',
        includes: "MMA, karate, judo, kung fu",
      },
      'IAB17-21': {
        name: 'Mountain Biking',
        merge: 'IAB17-3',
      },
      'IAB17-22': {
        name: 'NASCAR Racing', 
        merge: 'IAB17-25',
      },
      'IAB17-23': {
        id: "WEB17-14",
        name: 'Olympics',
      },
      'IAB17-24': {
        id: "WEB17-15",
        name: 	'Paintball',
      },
      'IAB17-25': {
        id: "WEB17-16",
        name: 'Car, Motorcycles & Power',
      },
      'IAB17-26': {
        id: "WEB17-17",
        name: 'Basketball',
        includes: "netball, korfball",
      },
      'IAB17-27': {
        id: "WEB17-18",
        name: 'Ice Hockey',
      },
      'IAB17-28': {
        id: "WEB17-19",
        name: 'Rodeo',
      },
      'IAB17-29': {
        id: "WEB17-20",
        name: 'Rugby', 
        includes: "Australian football",
      },
      'IAB17-30': {
        id: "WEB17-21",
        name: 'Running & Jogging',
        includes: "orienteering, cross-country, marathon",
      },
      'IAB17-31': {
        id: "WEB17-22",
        name: 'Sailing', 
      },
      'IAB17-32': {
        id: "WEB17-23",
        name: 'Fishing', 
      },
      'IAB17-33': {
        id: "WEB17-24",
        name: 'Scuba Diving',
      },
      'IAB17-34': {
        id: "WEB17-25",
        name: 'Skateboarding',
      },
      'IAB17-35': {
        id: "WEB17-26",
        name: 'Skiing', 
      },
      'IAB17-36': {
        name: 'Snowboarding', 
        merge: 'IAB17-101',
      },
      'IAB17-37': {
        id: "WEB17-27",
        name: 'Surfing & Bodyboarding', 
      },
      'IAB17-38': {
        id: "WEB17-28",
        name: 'Swimming', 
        includes: "life saving, diving",
      },
      'IAB17-39': {
        id: "WEB17-29",
        name: 'Table Tennis', 
      },
      'IAB17-40': {
        id: "WEB17-30",
        name: 'Tennis', 
        includes: "pickleball",
      },
      'IAB17-41': {
        id: "WEB17-31",
        name: 'Volleyball', 
      },
      'IAB17-42': {
        id: "WEB17-32",
        name: 'Walking and Hiking', 
      },
      'IAB17-43': {
        name: 'Waterski & Wakeboard',
        merge: 'IAB17-102',
      },
      'IAB17-44': {
        id: "WEB17-33",
        name: 'Soccer', 
      },
      'IAB17-100': {
        id: "WEB17-34",
        name: 'Wrestling', 
        includes: "WWE, olympic wrestling, sumo",
      },
      'IAB17-101': {
        id: "WEB17-35",
        name: 'Winter Sports', 
        includes: "biathlon, sledding, curling, luge, skeleton, snow rackets",
        includesNot: "skiing, snowboarding, ice skating, hockey"
      },
      'IAB17-102': {
        id: "WEB17-36",
        name: 'Water Sports', 
        includes: "rafting, water polo, jet ski (sport), windsurf",
      },
      'IAB17-103': {
        id: "WEB17-37",
        name:  'Rowing', 
      },
      'IAB17-104': {
        name: 'Kitesurfing',
        merge: 'IAB17-102',
      },
      'IAB17-105': {
        id: "WEB17-38",
        name: 'Pool & Snooker',
      },
      'IAB17-106': {
        id: "WEB17-39",
        name: 'Track & Field', 
      },
      'IAB17-107': {
        id: "WEB17-40",
        name: 'Handball', 
      },
      'IAB17-108': {
        id: "WEB17-41",
        name: 'Squash',
      },
      'IAB17-109':  {
        id: "WEB17-42",
        name: 'Softball', 
      },
      'IAB17-110': {
        id: "WEB17-43",
        name: 'Skating',
        includes: "rollerblades",
      },
      'IAB17-111': {
        id: "WEB17-44",
        name:  'Lacrosse', 
      },
      'IAB17-112': {
        id: "WEB17-45",
        name:  'Gymnastics',
      },
      'IAB17-113': {
        id: "WEB17-46",
        name: 'Field Hockey',
        includes: "roller hockey, floorball",
      },
      'IAB17-114': {
        id: "WEB17-47",
        name:  'Fencing',
      },
      'IAB17-115': {
        id: "WEB17-48",
        name: 'Frisbee', 
        includes: "golf disc, ultimate frisbee"
      },
      'IAB17-116': {
        id: "WEB17-49",
        name:  'Darts', 
      },
      'IAB17-118': {
        id: "WEB17-50",
        name:  'Badminton', 
      },
      'IAB17-119': {
        id: "WEB17-51",
        name:  'Dog Racing', 
      },
      'IAB17-120': {
        id: "WEB17-52",
        name:  'Disability', 
      },
      'IAB17-121': {
        id: "WEB17-53",
        name:  'Fantasy',
      },
      'IAB17-117': {
        id: "WEB17-54",
        name:  'Bowling',
      },
    }
  },
  'IAB18': { 
    name: 'Style & Fashion',
    id: "WEB18",
    empty: true,
    children: {
      'IAB18-1': {
        id: "WEB18-1",
        name: 'Beauty',
        includes: "beauty product, shaving, beauty pageant",
      },
      'IAB18-2': {
        id: "WEB18-2",
        name:	'Body Art',
        includesNot: "tattoo, piercing",
      },
      'IAB18-3': {
        id: "WEB18-3",
        name:	'Fashion', 
      },
      'IAB18-4': {
        id: "WEB18-4",
        name:	'Jewelry & Accessories',
        includes: "watches",
      },
      'IAB18-5': {
        id: "WEB18-5",
        name:	'Clothing',
        notIncludes : "swimsuits",
      },
      'IAB18-6': {
        name: 'Accessories', 
        includes: "purse, gloves, belt, hats",
        merge: 'IAB18-4',
      },
      'IAB18-7': {
        id: "WEB18-6",
        name: 'Shoes & Socks',
        includes: "boots, sandals",
      },
      'IAB18-100': {
        id: "WEB18-7",
        name: 'Tattoo', 
      },
      'IAB18-101': {
        id: "WEB18-8",
        name: 'Piercing', 
      },
      'IAB100-12': {
        id: "WEB18-9",
        name: 'Lingerie', 
      },
      'IAB100-13': {
        id: "WEB18-10",
        name: 'Swimsuits',
      },
    }
  },
  'IAB19': { 
    name: 'Technology & Computing',
    id: "WEB19",
    children: {
      'IAB19-1': {
        id: "WEB19-1",
        name: 'Graphic Design',
      },
      'IAB19-6': {
        id: "WEB19-2",
        name:	'Cell Phones & Tablets',
      },
      'IAB19-8': {
        id: "WEB19-3",
        name:	'Computer Networking',
      },
      'IAB19-9': {
        id: "WEB19-4",
        name:	'Computers & Peripherals',
      },
      'IAB19-10': {
        name: 'Computer Reviews',
        merge: 'IAB19-9',
      },
      'IAB19-11': {
        id: "WEB19-5",
        name:	'Cloud Computing & Hosting',
        includes: "cloud computing, web hosts, data centers",
      },
      'IAB19-12': {
        id: "WEB19-6",
        name:	'Databases',
      },
      'IAB19-15': {
        id: "WEB19-7",
        name:	'Email & Webmail',
      },
      'IAB19-18': {
        id: "WEB19-8",
        name:	'Internet Technology',
        includes: "internet providers, cybercafes, VPN, whois"
      },
      'IAB19-23': {
        name:	'Net Conferencing',
        merge: 'IAB19',
      },
      'IAB19-26': {
        name: 'Palmtops, PDAs & Tablets',
        merge: 'IAB19-6',
      },
      'IAB19-31': {
        id: "WEB19-9",
        name:	'Unix and Linux',
      },
      'IAB19-34': {
        id: "WEB19-10",
        name:	'Web Design & HTML', 
      },
      'IAB19-35': {
        id: "WEB19-11",
        name:	'Web Search',
        includs: "search engines, web portals",
      },
      'IAB19-36': {
        id: "WEB19-12",
        name:	'Windows',
      },
      'IAB19-100': {
        id: "WEB19-13",
        name: 'Consumer Electronics',
      },
      'IAB19-101': {
        id: "WEB19-14",
        name: 'Crypto currencies & NFT',
        includes: "Web3",
      },
      'IAB19-102': {
        id: "WEB19-15",
        name: 'Software Download',
        includes : "mobile apps",
      },
      'IAB19-103': {
        id: "WEB19-16",
        name: 'Source Code & Repository, Programming',
      },
      'IAB19-105': {
        id: "WEB19-17",
        name: 'File Sharing and Hosting',
      },
      'IAB19-106': {
        id: "WEB19-18",
        name: 'Image Sharing and Hosting',
      },
      'IAB19-108': {
        id: "WEB19-19",
        name: 'Computer Security & Hacking',
      },
      'IAB19-109': {
        id: "WEB19-20",
        name: 'Social Networks',
      },
      'IAB19-110': {
        id: "WEB19-21",
        name: 'Online Chat', 
      },
    }
  },
  'IAB20': {
    name: 'Travel',
    id: "WEB20",
    includes: "tourism",
    children: {
      'IAB20-1': {
        id: "WEB20-1",
        name: 'Adventure Travel',
        includes: "Safari, sport vacations"
      },
      'IAB20-2': {
        name:	'Africa',
        merge: 'IAB20',
        hide: true,
      },
      'IAB20-3': {
        id: "WEB20-2",
        name:	'Air Travel',
        includes: "airline companies"
      },
      'IAB20-4': {
        name:	'Oceania', 
        merge: 'IAB20',
        hide: true,
      },
      'IAB20-5': {
        name:	'Bed & Breakfasts',
        merge: 'IAB20-18',
      },
      'IAB20-6': {
        name:	'Budget Travel',
        merge: 'IAB20',
        hide: true,
      },
      'IAB20-7': {
        name:	'Business Travel',
        merge: 'IAB20',
        hide: true,
      },
      'IAB20-8': {
        name:	'By US Locale',
        merge: 'IAB20',
        hide: true,
      },
      'IAB20-9': {
        id: "WEB20-3",
        name:	'Camping',
      },
      'IAB20-10': {
        name:	'Canada',
        merge: 'IAB20',
        hide: true,
      },
      'IAB20-11': {
        name:	'Caribbean',
        merge: 'IAB20',
        hide: true,
      },
      'IAB20-12': {
        id: "WEB20-4",
        name:	'Cruises',
      },
      'IAB20-13': {
        name:	'Eastern Europe',
        merge: 'IAB20',
        hide: true,
      },
      'IAB20-14': {
        name:	'Europe',
        merge: 'IAB20',
        hide: true,
      },
      'IAB20-15': {
        name:	'France',
        merge: 'IAB20',
        hide: true,
      },
      'IAB20-16': {
        name:	'Greece', 
        merge: 'IAB20',
        hide: true,
      },
      'IAB20-17': {
        name:	'Honeymoons/Getaways',
        merge: 'IAB20',
        hide: true,
      },
      'IAB20-18': {
        id: "WEB20-5",
        name:	'Accommodation', 
        includes: "hotels, apartments, villas, timeshare",
      },
      'IAB20-19': {
        name:	'Italy',
        merge: 'IAB20',
        hide: true,
      },
      'IAB20-20': {
        name:	'Japan', 
        merge: 'IAB20',
        hide: true,
      },
      'IAB20-21': {
        name:	'Mexico & Central America',
        merge: 'IAB20',
        hide: true,
      },
      'IAB20-22': {
        id: "WEB20-6",
        name:	'Parks & Beaches',
        includes: "national parks"
      },
      'IAB20-23': {
        name:	'South America',
        merge: 'IAB20',
        hide: true,
      },
      'IAB20-24': {
        name:	'Spas',
        merge: 'IAB18-1',
        hide: true,
      },
      'IAB20-25': {
        id: "WEB20-7",
        name:	'Theme Parks',
        includes: "haunted house"
      },
      'IAB20-26': {
        name:	'Traveling with Kids',
        merge: 'IAB20',
        hide: true,
      },
      'IAB20-27': {
        name:	'United Kingdom',
        merge: 'IAB20',
        hide: true,
      },

      'IAB20-100': {
        id: "WEB20-8",
        name: 'Transportation',
        includes: "car rentals, taxis, bus, parking",
        includesNot: "air travel, trains",
      },
      'IAB20-101': {
        name: 'Asia & Middle East', 
        merge: 'IAB20',
        hide: true,
      },
      'IAB20-102': {
        id: "WEB20-9",
        name: 'Maps',
      },
    }
  },
  'IAB21': {
    name: 'Real Estate',
    id: "WEB21",
    includes: "commercial estates",
    children: {
      'IAB21-3': {
        id: "WEB21-1",
        name: 'Buying/Selling Homes',
        includes: "apartment renting, house renting",
      },
    }
  },
  'IAB22': {
    name: 'Shopping',
    id: "WEB22",
    includes: "stores",
    children: {
      'IAB22-100': {
        id: "WEB22-1",
        name: 'Auctions',
      },
      'IAB22-101': {
        id: "WEB22-2",
        name: 'Classified & Marketplace',
      },
      'IAB22-102': {
        id: "WEB22-3",
        name: 'Domain Names',
      },
    }
  },
  'IAB23': {
    name: 'Religion & Spirituality',
    id: "WEB23",
    includes: 'laity, other religions',
    children: {
      'IAB23-1': {
        id: "WEB23-1",
        name: 'Alternative Religions', 
      },
      'IAB23-2': {
        id: "WEB23-2",
        name:	'Atheism & Agnosticism',
        includes: 'anti religion'
      },
      'IAB23-3': {
        id: "WEB23-3",
        name:	'Buddhism',
      },
      'IAB23-4': {
        name:	'Catholicism',
        merge: 'IAB23-5',
        hide: true,
      },
      'IAB23-5': {
        id: "WEB23-4",
        name:	'Christianity',
      },
      'IAB23-6': {
        id: "WEB23-5",
        name:	'Hinduism',
      },
      'IAB23-7': {
        id: "WEB23-6",
        name:	'Islam',
        includes: "muslim",
      },
      'IAB23-8': {
        id: "WEB23-7",
        name:	'Judaism',
        includes: "jews",
      },
      'IAB23-9': {
        id: "WEB23-8",
        name:	'Latter-Day Saints',
        includes: "mormons",
      },
      'IAB23-10': {
        id: "WEB23-9",
        name:	'Pagan & Wiccan',
        merge: 'IAB23-107',
      },
      'IAB23-100': {
        name: 'Scientology',
      },
      'IAB23-101': {
        id: "WEB23-10",
        name: 'Taoism',
        includes: "Feng Shui, Tai Chi"
      },
      'IAB23-102': {
        id: "WEB23-11",
        name: 'New Age',
        includes: "shaman, healing crystals"
      },
      'IAB23-103': {
        name: 'Cartomancy',
        merge: 'IAB23-104',
      },
      'IAB23-104': {
        id: "WEB23-12",
        name: 'Psychic, Astrology, Numerology',
        includes: "medium, horoscope",
      },
      'IAB23-105': {
        id: "WEB23-13",
        name: "Baha'ism", 
      },
      'IAB23-106': {
        id: "WEB23-14",
        name: 'Sikhism',
      },
      'IAB23-107': {
        id: "WEB23-15",
        name: 'Esoteric and Occult',
      },
      'IAB23-108': {
        name: 'Numerology',
        merge: 'IAB23-104',
      },
      'IAB23-109': {
        id: "WEB23-16",
        name: 'Jainism',
      },
      'IAB15-5': {
        id: "WEB23-17",
        name:	'Paranormal Phenomena', // Better place?
        includes: "ghost",
      },
    }
  },
  'IAB101': { 
    name: 'LGBTQ+',
    id: "WEB24",
    children: {
      'IAB101-1': {
        id: "WEB24-1",
        name: 'Transgender',
        merge: 'IAB101',
      },
      'IAB101-2': {
        id: "WEB24-2",
        name: 'Gay',
        merge: 'IAB101',
      },
      'IAB101-3': {
        id: "WEB24-3",
        name: 'Lesbian',
        merge: 'IAB101',
      },
    }
  },
  'IAB102': { 
    name: 'Gambling',
    id: "WEB25",
    children: {
      'IAB102-1': {
        id: "WEB25-1",
        name: 'Casino',
      },
      'IAB102-2': {
        id: "WEB25-2",
        name: 'Lottery',
      },
      'IAB102-3': {
        id: "WEB25-3",
        name: 'Bets',
      },
      'IAB102-4': {
        id: "WEB25-4",
        name: 'Poker', 
      },
    }
  },
  'IAB103': {
    name: 'Tobacco',
    id: "WEB26",
    includes: "lighter, anti-smoking, tobacco issues, nicotine",
    children: {
      'IAB103-1': {
        id: "WEB26-1",
        name: 'Cigar',
      },
      'IAB103-2': {
        id: "WEB26-2",
        name: 'Pipe',
      },
      'IAB103-3': {
        id: "WEB26-3",
        name: 'Cigarette',
      },
      'IAB103-4': {
        id: "WEB26-4",
        name: 'Hookah & Shisha',
      },
    }
  },

  'IAB100': {
    name: 'Custom category',
    id: "WEB27",
    empty: true,
    children: {
      'IAB100-1': {
        id: "WEB27-1",
        name: 'Weapons',
        includes: "knives, guns, tactical gear"
      },
      // 'IAB25-2': {
      //   id: "WEB27-2",
      //   name:	'Extreme Graphic/Explicit Violence',
      // },
      'IAB25-4': {
        id: "WEB27-3",
        name:	'Profane Content',
      },
      'IAB25-5': {
        id: "WEB27-4",
        name:	'Hate Content',
      },
      'IAB25-3': {
        id: "WEB27-5",
        name:	'Pornography',
      },
      'IAB100-14': {
        id: "WEB27-6",
        name: 'Nudity',
      },
      'IAB25-100': {
        id: "WEB27-7",
        name:	'Sex Toys',
      },

      'IAB26-1': {
        name:	'Illegal Content',
        merge: 'IAB26-4',
      },
      // 'IAB26-2': {
      //   id: "WEB27-8",
      //   name:	'Phishing',
      // },
      // 'IAB26-3': {
      //   id: "WEB27-9",
      //   name:	'Spyware & Malware',
      // },
      'IAB26-4': {
        id: "WEB27-10",
        name:	'Copyright Infringement',
        includes: "free movie download, game hacks"
      },

      'IAB26-100': {
        id: "WEB27-11",
        name:	'Illegal Drugs',
      },
      'IAB26-101': {
        id: "WEB27-12",
        name:	'Marijuana & Hemp',
        includes: "CBD, cannabis, hemp, marijuana"
      },
      'IAB26-102': {
        name:	'Peer-to-Peer',
        merge: 'IAB26-4',
      },
    }
  },

  'IAB27': {
    name: 'Generic Content',
    id: "WEB28",
    empty: true,
    children: {
      'IAB24-4': {
        id: "WEB28-1",
        name: 'Redirection',
      },
      'IAB24-8': {
        id: "WEB28-2",
        name: 'Spam',
      },
      'IAB24-9': {
        id: "WEB28-3",
        name: 'Sitemap',
      },
      'IAB24-10': {
        id: "WEB28-4",
        name: 'Login',
        includes: "login, logout, sign up, reset password"
      },
      'IAB24-11': {
        id: "WEB28-5",
        name: 'Terms of Service',
        includes: "privacy policy, legal mentions, cookie banner"
      },
      'IAB24-12': {
        id: "WEB28-6",
        name: 'Help and Support',
      },
      'IAB19-107': {
        id: "WEB28-7",
        name: 'Blog',
      },
      'IAB19-104': {
        id: "WEB28-8",
        name: 'Discussion Forums',
      },
      'IAB25-6': {
        id: "WEB28-9",
        name:	'Under Construction',
        includes: "broken pages, dead sites, parked domains",
      },
      'IAB100-25': {
        id: "WEB28-10",
        name:	'Form',
        includes: "contact form, feedback form",
      },
    }
  },

  'IAB24': {
    name: 'Uncategorized',
    id: "WEB29",
    empty: true,
    children: {
      'IAB24-1': {
        id: "WEB29-1",
        name: 'Not enough content',
        notModel: true,
      },
      'IAB24-3': {
        id: "WEB29-2",
        name: 'Unsupported Content Type',
        notModel: true,
      },
      'IAB24-5': {
        id: "WEB29-3",
        name: 'Unknown or Unsupported language',
        notModel: true,
      },
      'IAB24-6': {
        id: "WEB29-4",
        name: 'Blocked',
        notModel: true,
      },
      'IAB24-7': {
        id: "WEB29-5",
        name: 'Unreachable',
        notModel: true,
      },
    }
  },


  'IAB25': {
    name: 'Non-Standard Content',
    empty: true,
    hide: true,
    children: {
    }
  },
  'IAB26': {
    name: 'Illegal Content',
    empty: true,
    hide: true,
    children: {
    }
  },
};

export default IAB;