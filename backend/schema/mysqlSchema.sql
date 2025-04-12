-- Table: tbl_provinces
CREATE TABLE tbl_provinces (
    provinceCode VARCHAR(255) NOT NULL UNIQUE,
    regionName VARCHAR(255) NOT NULL,
    provinceName VARCHAR(255) NOT NULL,
    PRIMARY KEY (provinceCode)
);

-- Table: tbl_municipalities (to represent the municipality array in tbl_provinces)
CREATE TABLE tbl_municipalities (
    municipal_id VARCHAR(255) NOT NULL,
    municipal VARCHAR(255) NOT NULL,
    provinceCode VARCHAR(255) NOT NULL,
    PRIMARY KEY (municipal_id),
    FOREIGN KEY (provinceCode) REFERENCES tbl_provinces(provinceCode)
);

-- Table: tbl_barangay
CREATE TABLE tbl_barangay (
    barangayCode VARCHAR(255) NOT NULL,
    barangay VARCHAR(255) NOT NULL,
    municipal_id VARCHAR(255),
    PRIMARY KEY (barangayCode),
    FOREIGN KEY (municipal_id) REFERENCES tbl_municipalities(municipal_id)
);

-- Table: tbl_physical_info
CREATE TABLE tbl_physical_info (
    physicalID VARCHAR(255) NOT NULL UNIQUE,
    barangayCode VARCHAR(255) NOT NULL,
    totalLandArea DOUBLE NOT NULL,
    barangayCategory ENUM('Urban', 'Rural') NOT NULL,
    landClassification ENUM('Upland', 'Lowland', 'Coastal', 'Landlocked') NOT NULL,
    barangayLocation ENUM('Tabing-ilog', 'Tabing-dagat', 'Tabing-bundok', 'Poblacion') NOT NULL,
    economicSource ENUM('Agricultural', 'Fishing', 'Commercial', 'Industrial') NOT NULL,
    PRIMARY KEY (physicalID)
);

-- Table: tbl_political_info
CREATE TABLE tbl_political_info (
    politicalInfoid INT AUTO_INCREMENT PRIMARY KEY,
    barangayCode VARCHAR(255) NOT NULL,
    legalBasisOfCreation VARCHAR(255) NOT NULL,
    dateOfPlebiscite DATE NOT NULL,
    numberOfPrecincts INT NOT NULL,
    luponMember INT NOT NULL,
    barangayTanod INT NOT NULL,
    barangayHealthWorker INT NOT NULL,
    barangayNutritionScholar INT NOT NULL,
    dayCareWorker INT NOT NULL,
    vawDeskOfficer INT NOT NULL,
    badacClusterLeaders INT NOT NULL
);

-- Table: tbl_fiscal_info
CREATE TABLE tbl_fiscal_info (
    fiscalInfoid INT AUTO_INCREMENT PRIMARY KEY,
    barangayCode VARCHAR(255) NOT NULL,
    internalRevenueAllotment DOUBLE NOT NULL,
    donationGrant DOUBLE NOT NULL,
    shareFromNationalWealth DOUBLE NOT NULL,
    othersExternalSubsidy DOUBLE NOT NULL,
    rptShare DOUBLE NOT NULL,
    feesAndCharges DOUBLE NOT NULL,
    othersLocal DOUBLE NOT NULL
);

-- Table: tbl_demographic_info
CREATE TABLE tbl_demographic_info (
    demographicInfoid INT AUTO_INCREMENT PRIMARY KEY,
    barangayCode VARCHAR(255) NOT NULL,
    registeredVoters INT NOT NULL,
    RBIs BOOLEAN NOT NULL,
    numberOfInhabitants INT,
    firstSem INT,
    secondSem INT,
    numberOfHouseholds INT NOT NULL,
    numberOfFamilies INT NOT NULL
);

-- Table: tbl_population_by_age_bracket
CREATE TABLE tbl_population_by_age_bracket (
    pbabid INT AUTO_INCREMENT PRIMARY KEY,
    demographicInfoId INT NOT NULL,
    ageBracket VARCHAR(255) NOT NULL,
    male INT NOT NULL,
    female INT NOT NULL,
    total INT NOT NULL,
    FOREIGN KEY (demographicInfoId) REFERENCES tbl_demographic_info(id)
);

-- Table: tbl_population_by_sector
CREATE TABLE tbl_population_by_sector (
    pbsid INT AUTO_INCREMENT PRIMARY KEY,
    demographicInfoId INT NOT NULL,
    sector VARCHAR(255) NOT NULL,
    male INT NOT NULL,
    female INT NOT NULL,
    total INT NOT NULL,
    FOREIGN KEY (demographicInfoId) REFERENCES tbl_demographic_info(id)
);

-- Table: tbl_socio_economic_info
CREATE TABLE tbl_socio_economic_info (
    economicInfoid INT AUTO_INCREMENT PRIMARY KEY,
    barangayCode VARCHAR(255) NOT NULL,
    largestPowerSupplyDistributor VARCHAR(255) NOT NULL,
    majorWaterSupplyLevel VARCHAR(255) NOT NULL
);

-- Table: tbl_inventory_of_facilities
CREATE TABLE tbl_inventory_of_facilities (
    inventoryFacilityid INT AUTO_INCREMENT PRIMARY KEY,
    socioEconomicInfoId INT NOT NULL,
    facility VARCHAR(255) NOT NULL,
    status ENUM('YES', 'With Access Only', 'NONE') NOT NULL,
    FOREIGN KEY (socioEconomicInfoId) REFERENCES tbl_socio_economic_info(id)
);

-- Table: tbl_inventory_of_properties
CREATE TABLE tbl_inventory_of_properties (
    inventoryPropid INT AUTO_INCREMENT PRIMARY KEY,
    socioEconomicInfoId INT NOT NULL,
    particular VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    remarks VARCHAR(255),
    FOREIGN KEY (socioEconomicInfoId) REFERENCES tbl_socio_economic_info(id)
);

-- Table: tbl_access_to_potable_water
CREATE TABLE tbl_access_to_potable_water (
    potableid INT AUTO_INCREMENT PRIMARY KEY,
    socioEconomicInfoId INT NOT NULL,
    typeOrLevel VARCHAR(255) NOT NULL,
    numberOfHouseholds INT NOT NULL,
    FOREIGN KEY (socioEconomicInfoId) REFERENCES tbl_socio_economic_info(id)
);

-- Table: tbl_awards_recognition
CREATE TABLE tbl_awards_recognition (
    recognitionid INT AUTO_INCREMENT PRIMARY KEY,
    barangayCode VARCHAR(255) NOT NULL,
    nationalLevel VARCHAR(255),
    regionalLevel VARCHAR(255),
    localLevel VARCHAR(255)
);

-- Table: tbl_inhabitants
CREATE TABLE tbl_inhabitants (
    inhabitantsid INT AUTO_INCREMENT PRIMARY KEY,
    hPhilSysNo VARCHAR(255),
    barangayID VARCHAR(255),
    householdId VARCHAR(255),
    headOfHousehold VARCHAR(255) NOT NULL,
    householdAddress VARCHAR(255) NOT NULL,
    contactNumber VARCHAR(255)
);

-- Table: tbl_inhabitant_members
CREATE TABLE tbl_inhabitant_members (
    inhabitantsmemberid INT AUTO_INCREMENT PRIMARY KEY,
    inhabitantId INT NOT NULL,
    philSysNo VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    middleName VARCHAR(255) NOT NULL,
    ext VARCHAR(255),
    placeBirth VARCHAR(255) NOT NULL,
    dateBirth DATE,
    sex ENUM('Male', 'Female', 'Other') NOT NULL,
    civilStatus ENUM('Single', 'Married', 'Widowed', 'Divorced', 'Separated') NOT NULL,
    citizenship ENUM('Filipino', 'Dual', 'Other') NOT NULL,
    religion VARCHAR(255) NOT NULL,
    education ENUM('No Formal Education', 'Elementary', 'High School', 'College', 'Postgraduate', 'Vocational') NOT NULL,
    educationStatus ENUM('Graduated', 'Undergraduate', 'Completed') NOT NULL,
    voter ENUM('Yes', 'No') NOT NULL,
    citizenStatus ENUM('Labor/Employed', 'Unemployed', 'PWD', 'OFW', 'Senior Citizen', 'Solo Parent', 'Out of School Youth', 'Out of School Children', 'Student', 'Housewife', 'Retired', 'Other') NOT NULL,
    occupation VARCHAR(255),
    relationshipToHead VARCHAR(255) NOT NULL,
    FOREIGN KEY (inhabitantId) REFERENCES tbl_inhabitants(id)
);

-- Table: tbl_officials
CREATE TABLE tbl_officials (
    offcialsid INT AUTO_INCREMENT PRIMARY KEY,
    employee_id VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    middle VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    contact VARCHAR(255),
    email VARCHAR(255),
    dateStart DATE NOT NULL,
    dateEnd DATE NOT NULL,
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: tbl_users
CREATE TABLE tbl_users (
    usersid INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_level VARCHAR(255) NOT NULL
    employee_id VARCHAR(255) NOT NULL,
);
