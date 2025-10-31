// Mengonversi koordinat dari Derajat Menit Detik (DMS) ke Desimal Derajat (DD)
function dmsToDd(derajat, menit, detik) {
    let dd = derajat + (menit / 60) + (detik / 3600);
    return dd;
}

const stasiunData = [
  {
    id: 'stasiun-1',
    nama: 'Stasiun 1. Dato',
    koordinat: { lat: -dmsToDd(3, 33, 37), lng: dmsToDd(118, 59, 1) }, // 3°33'37"S 118°59'01"E
    persentaseKerusakan: 82.27,
    tutupanBenthic: {
      'CORAL (HC)': 4.55,
      'DEAD CORAL (DC)': 82.27000000000001,
      'SOFT CORAL (SC)': 0,
      'OTHER BIOTA (OT)': 3.18, // (SP + FS + OT) = 0.91 + 2.27 + 0
      'SAND (S)': 10,
      'ROCK (RK)': 0
    },
    lifeForm: {
      'Acropora Branching (ACB)': 1.8181818181818181,
      'Acropora Encrusting (ACE)': 0,
      'Acropora Submassive (ACS)': 0,
      'Coral Branching (CB)': 2.2727272727272729,
      'Coral Encrusting (CE)': 0,
      'Coral Foliose (CF)': 0,
      'Coral Heliopora (CHL)': 0,
      'Coral Massive (CM)': 0.45454545454545453,
      'Coral Millepora (CME)': 0,
      'Coral Mushroom (CMR)': 0,
      'Coral Submassive (CS)': 0,
    },
    interpretasiEkologis: "Kondisi di Stasiun 1 (Dato) sangat kritis. Dengan tutupan karang keras hanya 4.55%, lokasi ini didominasi oleh puing (Rubble) sebesar 65.45% (termasuk dalam 'DEAD CORAL'). Tingkat kerusakan total (DC+DCA+R) mencapai 82.27%. Ini mengindikasikan kemungkinan adanya gangguan fisik berat di masa lalu atau tekanan lingkungan kronis yang parah."
  },
  {
    id: 'stasiun-2',
    nama: 'Stasiun 2. Batu Cincin',
    koordinat: { lat: -dmsToDd(3, 33, 4), lng: dmsToDd(118, 58, 42) }, // 3°33'04"S 118°58'42"E
    persentaseKerusakan: 58.18,
    tutupanBenthic: {
      'CORAL (HC)': 25.90909090909091,
      'DEAD CORAL (DC)': 58.18181818181818,
      'SOFT CORAL (SC)': 6.3636363636363633,
      'OTHER BIOTA (OT)': 3.6363636363636362, // (SP + FS + OT) = 0 + 3.636... + 0
      'SAND (S)': 5.9090909090909092,
      'ROCK (RK)': 0
    },
    lifeForm: {
      'Acropora Branching (ACB)': 2.7272727272727271,
      'Acropora Encrusting (ACE)': 0.90909090909090906,
      'Acropora Submassive (ACS)': 0,
      'Coral Branching (CB)': 0,
      'Coral Encrusting (CE)': 0,
      'Coral Foliose (CF)': 2.7272727272727271,
      'Coral Heliopora (CHL)': 0,
      'Coral Massive (CM)': 16.363636363636363,
      'Coral Millepora (CME)': 0,
      'Coral Mushroom (CMR)': 0,
      'Coral Submassive (CS)': 3.1818181818181817,
    },
    interpretasiEkologis: "Stasiun 2 (Batu Cincin) berada dalam kondisi 'Sedang' dengan tutupan karang keras 25.91%. Tingkat kerusakan masih tergolong tinggi (58.18%). Komunitas karang di sini didominasi oleh Coral Massive (CM) yang kokoh (16.36%), menunjukkan resiliensi terhadap gelombang, namun juga terdapat kompetisi dari Soft Coral (6.36%)."
  },
  {
    id: 'stasiun-3',
    nama: 'Stasiun 3. Tanjung Batu',
    koordinat: { lat: -dmsToDd(3, 32, 55), lng: dmsToDd(118, 58, 14) }, // 3°32'55"S 118°58'14"E
    persentaseKerusakan: 34.55,
    tutupanBenthic: {
      'CORAL (HC)': 30.454545454545453,
      'DEAD CORAL (DC)': 34.545454545454547,
      'SOFT CORAL (SC)': 0.45454545454545453,
      'OTHER BIOTA (OT)': 12.272727272727272, // (SP + FS + OT) = 1.36... + 0 + 10.90...
      'SAND (S)': 22.272727272727273,
      'ROCK (RK)': 0
    },
    lifeForm: {
      'Acropora Branching (ACB)': 0.45454545454545453,
      'Acropora Encrusting (ACE)': 0,
      'Acropora Submassive (ACS)': 0,
      'Coral Branching (CB)': 1.3636363636363635,
      'Coral Encrusting (CE)': 0,
      'Coral Foliose (CF)': 1.8181818181818181,
      'Coral Heliopora (CHL)': 0.90909090909090906,
      'Coral Massive (CM)': 1.8181818181818181,
      'Coral Millepora (CME)': 16.818181818181817,
      'Coral Mushroom (CMR)': 4.5454545454545459,
      'Coral Submassive (CS)': 2.7272727272727271,
    },
    interpretasiEkologis: "Stasiun 3 (Tanjung Batu) menunjukkan kondisi 'Sedang' yang relatif baik (HC 30.45%) dengan tingkat kerusakan 'Sedang' (34.55%). Lokasi ini memiliki keunikan dengan tutupan Coral Millepora (CME) yang sangat tinggi (16.82%) dan keberadaan Coral Mushroom (CMR) yang signifikan (4.55%). Tingginya tutupan 'Other Biota' (12.27%) juga patut dicatat."
  },
  {
    id: 'stasiun-4',
    nama: 'Stasiun 4. Cilallang I',
    koordinat: { lat: -dmsToDd(3, 33, 8), lng: dmsToDd(118, 57, 43) }, // 3°33'08"S 118°57'43"E
    persentaseKerusakan: 42.27,
    tutupanBenthic: {
      'CORAL (HC)': 38.18181818181818,
      'DEAD CORAL (DC)': 42.272727272727273,
      'SOFT CORAL (SC)': 0,
      'OTHER BIOTA (OT)': 8.6363636363636367, // (SP + FS + OT) = 4.09... + 1.81... + 2.72...
      'SAND (S)': 8.1818181818181817,
      'ROCK (RK)': 2.7272727272727271
    },
    lifeForm: {
      'Acropora Branching (ACB)': 3.1818181818181817,
      'Acropora Encrusting (ACE)': 0,
      'Acropora Submassive (ACS)': 0.45454545454545453,
      'Coral Branching (CB)': 6.3636363636363633,
      'Coral Encrusting (CE)': 5,
      'Coral Foliose (CF)': 0,
      'Coral Heliopora (CHL)': 0,
      'Coral Massive (CM)': 13.181818181818182,
      'Coral Millepora (CME)': 9.0909090909090917,
      'Coral Mushroom (CMR)': 0.45454545454545453,
      'Coral Submassive (CS)': 0.45454545454545453,
    },
    interpretasiEkologis: "Stasiun 4 (Cilallang I) memiliki tutupan karang keras (HC) tertinggi dari semua stasiun (38.18%), yang masuk kategori 'Baik'. Meskipun begitu, tingkat kerusakan juga masih signifikan (42.27%). Komunitas karang sangat beragam, didominasi oleh Coral Massive (CM, 13.18%), Coral Millepora (CME, 9.09%), dan Coral Branching (CB, 6.36%)."
  },
  {
    id: 'stasiun-5',
    nama: 'Stasiun 5. Cilallang II',
    koordinat: { lat: -dmsToDd(3, 33, 14), lng: dmsToDd(118, 57, 30) }, // 3°33'14"S 118°57'30"E
    persentaseKerusakan: 71.36,
    tutupanBenthic: {
      'CORAL (HC)': 19.545454545454547,
      'DEAD CORAL (DC)': 71.36363636363636,
      'SOFT CORAL (SC)': 0,
      'OTHER BIOTA (OT)': 7.7272727272727266, // (SP + FS + OT) = 3.63... + 1.81... + 2.27...
      'SAND (S)': 0.90909090909090906,
      'ROCK (RK)': 0.45454545454545453
    },
    lifeForm: {
      'Acropora Branching (ACB)': 0.90909090909090906,
      'Acropora Encrusting (ACE)': 0,
      'Acropora Submassive (ACS)': 0.90909090909090906,
      'Coral Branching (CB)': 0.90909090909090906,
      'Coral Encrusting (CE)': 2.7272727272727271,
      'Coral Foliose (CF)': 3.1818181818181817,
      'Coral Heliopora (CHL)': 0,
      'Coral Massive (CM)': 1.8181818181818181,
      'Coral Millepora (CME)': 8.1818181818181817,
      'Coral Mushroom (CMR)': 0,
      'Coral Submassive (CS)': 0.90909090909090906,
    },
    interpretasiEkologis: "Stasiun 5 (Cilallang II) berada dalam kondisi 'Buruk' (HC 19.55%) dengan tingkat kerusakan yang sangat tinggi (71.36%), mirip dengan Stasiun 1. Didominasi oleh puing (Rubble) sebesar 47.27% (termasuk dalam 'DEAD CORAL'). Karang yang bertahan didominasi oleh Coral Millepora (CME, 8.18%)."
  },
  {
    id: 'stasiun-6',
    nama: 'Stasiun 6. Passarang',
    koordinat: { lat: -dmsToDd(3, 33, 39), lng: dmsToDd(118, 56, 49) }, // 3°33'39"S 118°56'49"E
    persentaseKerusakan: 48.18,
    tutupanBenthic: {
      'CORAL (HC)': 37.272727272727273,
      'DEAD CORAL (DC)': 48.18181818181818,
      'SOFT CORAL (SC)': 0,
      'OTHER BIOTA (OT)': 10, // (SP + FS + OT) = 6.36... + 0 + 3.63...
      'SAND (S)': 4.5454545454545459,
      'ROCK (RK)': 0
    },
    lifeForm: {
      'Acropora Branching (ACB)': 0,
      'Acropora Encrusting (ACE)': 0,
      'Acropora Submassive (ACS)': 1.3636363636363635,
      'Coral Branching (CB)': 4.5454545454545459,
      'Coral Encrusting (CE)': 4.5454545454545459,
      'Coral Foliose (CF)': 0,
      'Coral Heliopora (CHL)': 0,
      'Coral Massive (CM)': 10.909090909090908,
      'Coral Millepora (CME)': 14.090909090909092,
      'Coral Mushroom (CMR)': 0,
      'Coral Submassive (CS)': 1.8181818181818181,
    },
    interpretasiEkologis: "Stasiun 6 (Passarang) juga menunjukkan kondisi 'Baik' (HC 37.27%), mirip Stasiun 4. Namun, ancaman signifikan terlihat dari tingginya 'Dead Coral with Algae' (DCA) sebesar 37.73% (termasuk dalam 'DEAD CORAL'). Ini mengindikasikan adanya nutrisi berlebih (eutrofikasi) yang memicu pertumbuhan alga, yang bersaing dan membunuh karang. Komunitas karang didominasi oleh Coral Millepora (CME, 14.09%) dan Coral Massive (CM, 10.91%)."
  }
];