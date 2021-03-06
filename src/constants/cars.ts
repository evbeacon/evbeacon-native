export const modelsByMake: { [key: string]: string[] } = {
  Aiways: ["Aiways U5"],
  Audi: ["e-tron 55", "e-tron 50"],
  BMW: ["i3"],
  BYD: ["BYD e6"],
  Chevrolet: ["Bolt EV"],
  Citroen: ["C-Zero", "ë-c4"],
  Ford: ["Focus Electric"],
  Honda: ["Clarity Electric"],
  Hyundai: ["Ioniq Electric", "Kona Electric"],
  "Land Rover": ["I-Pace"],
  Kandi: ["K23", "K27"],
  Kia: ["Soul EV", "e-Niro"],
  Kyburz: ["Race"],
  Lightning: ["Lightning GT"],
  Mahindra: ["e2o plus", "e-Verito"],
  "Mercedes-Benz": ["B-Class Electric Drive", "EQC"],
  "MG Motor": ["ZS EV"],
  "Micro Mobility Systems": ["Microlino"],
  Mitsubishi: ["i-MiEV"],
  "Motores Limpios": ["Zacua"],
  "MW Motors": ["Luka EV"],
  NIO: ["ES8", "ES6", "EC6"],
  Nissan: ["Leaf"],
  ECOmove: ["QBeak"],
  Peugeot: ["i0n", "Peugeot e208", "Peugeot e2008"],
  Polestar: ["2"],
  Rayttle: ["E28"],
  Renault: ["Zoe", "Twizy", "Kangoo Z.E.", "Fluence Z.E.", "SM3 Z.E."],
  SEAT: ["Mii Electric"],
  Skoda: ["CITIGOe IV"],
  Smart: ["ForTwo"],
  "Sono Motors": ["Sion"],
  Stevens: ["ZeCar"],
  "Tata Motors": ["Tata Nexon"],
  Tesla: ["Model S", "Model 3", "Model X", "Model Y"],
  Venturi: ["Fétish"],
  Volkswagen: ["e-Golf", "e-up!", "ID.4", "ID.3", "ID.3", "ID.3"],
  Xpeng: ["G3", "G3", "P7", "P7", "P7", "P7"],
};

export const makes = Object.keys(modelsByMake);

export const colors = [
  "White",
  "Silver",
  "Black",
  "Grey",
  "Blue",
  "Red",
  "Brown",
  "Green",
  "Gold",
  "Orange",
  "Yellow",
  "Purple",
];

export const plugTypes = ["Type 1", "Type 2", "CCS", "CHAdeMO", "Tesla"];
