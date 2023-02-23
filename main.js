// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = '';
  for (let i = 0; i < 15; i++) {
    // newStrand.push(returnRandBase());
    newStrand += returnRandBase();
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      // const formerDnaArray = ['A', 'T', 'C', 'G'];
      const dnaArray = this.dna.split('');
      const randomBase = returnRandBase();
      const randomIndex = Math.floor(Math.random() * dnaArray.length);
      const randomChar = randomBase[Math.floor(Math.random() * randomBase.length)];
      dnaArray[randomIndex] = randomChar;
      this.dna = dnaArray.join('');
      return this.dna;
    },
    compareDna(pAequorDna) {
      let count = 0;
      for (let i = 0; i < this.dna.length; i++){
        if(this.dna[i] === pAequorDna.dna[i]){
          count++;
        }
      }
      const percentDiff = (1 - (count / this.dna.length)) * 100;
      return percentDiff+'%';
    },
    willLikelySurvive(){
      const elementCount = this.dna.split('').filter(strand => strand === 'C' || strand === 'G').length;
      const elementPercent = (elementCount / this.dna.length) * 100;
      return elementPercent >= 60;
    }
  };
};

const pAequorData = [];

while (pAequorData.length < 30){
  const newData = pAequorFactory(pAequorData.length + 1, returnRandBase());
  if (newData.willLikelySurvive()) {
    pAequorData.push(newData);
  }
}

console.log(pAequorData);

// const pAequor1 = pAequorFactory(1, 'CGCGCG');
// const pAequor2 = pAequorFactory(2, 'ACCC');
// console.log(pAequor1.willLikelySurvive()); 

// const pAequor = pAequorFactory(2, 'ATCG');
// console.log(pAequor);

// const mutateDna = pAequor.mutate();
// console.log(mutateDna);
// console.log(pAequor)

