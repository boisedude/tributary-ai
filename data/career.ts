/**
 * @fileoverview Career history data for Michael Cooper.
 * This is the single source of truth for career information displayed on the About page.
 */

/**
 * A single career position/role
 */
export interface CareerPosition {
  id: string;
  company: string;
  title: string;
  startYear: number;
  endYear: number | "Present";
  highlights: string[];
}

/**
 * Education entry
 */
export interface Education {
  institution: string;
  degree?: string;
  field?: string;
  achievement?: string;
  year?: number;
}

/**
 * Historical certification
 */
export interface Certification {
  name: string;
  abbreviation?: string;
  note?: string;
}

/**
 * Complete career data structure
 */
export interface CareerData {
  positions: CareerPosition[];
  education: Education[];
  certifications: Certification[];
}

/**
 * Career positions in reverse chronological order
 */
export const careerPositions: CareerPosition[] = [
  {
    id: "omnistrate",
    company: "Omnistrate",
    title: "Head of GTM",
    startYear: 2024,
    endYear: "Present",
    highlights: [
      "Revenue growth from $0 to ~$3M ARR",
      "Launched AWS and Azure Marketplace listings",
      "$1M+ in cloud partner investment commitments for 2026",
    ],
  },
  {
    id: "ikigai",
    company: "Ikigai Labs",
    title: "VP, Partnerships",
    startYear: 2023,
    endYear: 2024,
    highlights: [
      "AWS, Azure, GCP, and Salesforce marketplace listings",
      "AWS ISV Accelerate program participation",
    ],
  },
  {
    id: "astronomer",
    company: "Astronomer",
    title: "VP, Global Partnerships",
    startYear: 2022,
    endYear: 2023,
    highlights: [
      "Global partnership strategy and execution",
      "Cloud provider ecosystem development",
    ],
  },
  {
    id: "confluent",
    company: "Confluent",
    title: "Senior Director, Cloud Partnerships",
    startYear: 2020,
    endYear: 2022,
    highlights: [
      "Built Microsoft partnership from $0 to ~$40M ARR",
      "Led first-party Azure integration",
      "Multiple Microsoft Partner of the Year awards",
    ],
  },
  {
    id: "citrix-2",
    company: "Citrix",
    title: "Senior Director, Microsoft Partnership",
    startYear: 2018,
    endYear: 2020,
    highlights: [
      "Signed major cloud partnership agreement",
      "Launched joint Azure Virtual Desktop offering",
    ],
  },
  {
    id: "microsoft-2",
    company: "Microsoft",
    title: "National Sales Lead, Cloud Infrastructure / Worldwide Azure Infrastructure GTM Lead",
    startYear: 2015,
    endYear: 2018,
    highlights: [
      "$1.1B revenue responsibility with 12% YoY growth",
      "Circle of Excellence award (FY2016)",
      "Worldwide Azure Infrastructure GTM leadership",
    ],
  },
  {
    id: "citrix-1",
    company: "Citrix",
    title: "Director, Partner Integration",
    startYear: 2013,
    endYear: 2015,
    highlights: [
      "Led team of 14",
      "Early Windows desktop deployments on AWS and Azure",
      "Pioneered cloud-hosted NVIDIA GPU VDI deployments",
    ],
  },
  {
    id: "microsoft-1",
    company: "Microsoft",
    title: "Windows Server Specialist / Datacenter Program Manager",
    startYear: 2005,
    endYear: 2012,
    highlights: [
      "Technical specialist to program management progression",
      "Enterprise datacenter modernization initiatives",
    ],
  },
  {
    id: "simplot",
    company: "J.R. Simplot",
    title: "Global Architect",
    startYear: 2001,
    endYear: 2005,
    highlights: [
      "Migration to Active Directory and Exchange 2000",
      "Consolidation of 30+ domains",
      "Featured Microsoft TechEd migration case study",
    ],
  },
  {
    id: "micron",
    company: "Micron Technology",
    title: "Tech Support / Supervisor / Global WAN/LAN Admin",
    startYear: 1995,
    endYear: 1998,
    highlights: [
      "Progression from tech support to supervisor (team of 19)",
      "Global WAN/LAN administration",
    ],
  },
];

/**
 * Education history
 */
export const education: Education[] = [
  {
    institution: "George Fox University",
    degree: "BS",
    field: "Management & Business Information Systems",
  },
  {
    institution: "College of Eastern Utah",
    achievement: "CEDA Debate National Championship",
    year: 1994,
  },
];

/**
 * Historical certifications
 */
export const certifications: Certification[] = [
  {
    name: "Microsoft Certified Instructor",
    abbreviation: "MCT",
  },
  {
    name: "Microsoft Certified Systems Engineer",
    abbreviation: "MCSE",
    note: "Multiple tracks",
  },
  {
    name: "Certified Information Systems Security Professional",
    abbreviation: "CISSP",
  },
  {
    name: "Citrix Certified Instructor",
  },
  {
    name: "Cisco Certified Instructor",
  },
];

/**
 * Combined career data export
 */
export const careerData: CareerData = {
  positions: careerPositions,
  education,
  certifications,
};

/**
 * Get position by ID
 */
export const getPositionById = (id: string): CareerPosition | undefined => {
  return careerPositions.find((position) => position.id === id);
};

/**
 * Get positions by company name
 */
export const getPositionsByCompany = (company: string): CareerPosition[] => {
  return careerPositions.filter(
    (position) => position.company.toLowerCase() === company.toLowerCase()
  );
};

/**
 * Format year range for display
 */
export const formatYearRange = (
  startYear: number,
  endYear: number | "Present"
): string => {
  return `${startYear}-${endYear}`;
};
