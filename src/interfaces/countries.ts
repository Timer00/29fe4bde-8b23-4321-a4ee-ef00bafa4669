export enum LocaleToCountry {
  AF = "Afghanistan",
  AX = "Åland Islands",
  AL = "Albania",
  DZ = "Algeria",
  AS = "American Samoa",
  AD = "Andorra",
  AO = "Angola",
  AI = "Anguilla",
  AQ = "Antarctica",
  AG = "Antigua and Barbuda",
  AR = "Argentina",
  AM = "Armenia",
  AW = "Aruba",
  AU = "Australia",
  AT = "Austria",
  AZ = "Azerbaijan",
  BS = "Bahamas",
  BH = "Bahrain",
  BD = "Bangladesh",
  BB = "Barbados",
  BY = "Belarus",
  BE = "Belgium",
  BZ = "Belize",
  BJ = "Benin",
  BM = "Bermuda",
  BT = "Bhutan",
  BO = "Bolivia (Plurinational State of)",
  BQ = "Bonaire, Sint Eustatius and Saba",
  BA = "Bosnia and Herzegovina",
  BW = "Botswana",
  BV = "Bouvet Island",
  BR = "Brazil",
  IO = "British Indian Ocean Territory",
  BN = "Brunei Darussalam",
  BG = "Bulgaria",
  BF = "Burkina Faso",
  BI = "Burundi",
  CV = "Cabo Verde",
  KH = "Cambodia",
  CM = "Cameroon",
  CA = "Canada",
  KY = "Cayman Islands",
  CF = "Central African Republic",
  TD = "Chad",
  CL = "Chile",
  CN = "China",
  CX = "Christmas Island",
  CC = "Cocos (Keeling) Islands",
  CO = "Colombia",
  KM = "Comoros",
  CG = "Congo",
  CD = "Congo, Democratic Republic of the",
  CK = "Cook Islands",
  CR = "Costa Rica",
  CI = "Côte d'Ivoire",
  HR = "Croatia",
  CU = "Cuba",
  CW = "Curaçao",
  CY = "Cyprus",
  CZ = "Czechia",
  DK = "Denmark",
  DJ = "Djibouti",
  DM = "Dominica",
  DO = "Dominican Republic",
  EC = "Ecuador",
  EG = "Egypt",
  SV = "El Salvador",
  GQ = "Equatorial Guinea",
  ER = "Eritrea",
  EE = "Estonia",
  SZ = "Eswatini",
  ET = "Ethiopia",
  FK = "Falkland Islands (Malvinas)",
  FO = "Faroe Islands",
  FJ = "Fiji",
  FI = "Finland",
  FR = "France",
  GF = "French Guiana",
  PF = "French Polynesia",
  TF = "French Southern Territories",
  GA = "Gabon",
  GM = "Gambia",
  GE = "Georgia",
  DE = "Germany",
  GH = "Ghana",
  GI = "Gibraltar",
  GR = "Greece",
  GL = "Greenland",
  GD = "Grenada",
  GP = "Guadeloupe",
  GU = "Guam",
  GT = "Guatemala",
  GG = "Guernsey",
  GN = "Guinea",
  GW = "Guinea-Bissau",
  GY = "Guyana",
  HT = "Haiti",
  HM = "Heard Island and McDonald Islands",
  VA = "Holy See",
  HN = "Honduras",
}

export type Region = "Africa" | "Americas" | "Asia" | "Europe" | "Oceania" | "Global" | "";
type SubRegions = "Australia and New Zealand" | "Caribbean" | "Central America" | "Channel Islands" | "Eastern Africa" | "Eastern Asia" | "Eastern Europe" | "Latin America and the Caribbean" | "Melanesia" | "Micronesia" | "Middle Africa" | "Northern Africa" | "Northern America" | "Northern Europe" | "Polynesia" | "South America" | "South-eastern Asia" | "Southern Asia" | "Southern Europe" | "Sub-Saharan Africa" | "Western Africa" | "Western Asia" | "Western Europe" | "";
type IntermediateRegion = "Caribbean" | "Central America" | "Channel Islands" | "Eastern Africa" | "Middle Africa" | "South America" | "Southern Africa" | "Western Africa" | "";

export interface Country {
  id: number;
  name: string;
  region: Region
  'alpha-2': LocaleToCountry;
  'alpha-3': string;
  iso_3166_2: string;
  'sub-region': SubRegions;
  'region-code': string;
  'country-code': string;
  'sub-region-code': string;
  'intermediate-region': IntermediateRegion;
  'intermediate-region-code': string;
}

type Countries = {
  [key in LocaleToCountry]: Country
}

export type Regions = {
  [key in Region]: Countries
}
