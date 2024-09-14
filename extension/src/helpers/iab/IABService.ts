
import IAB from "./IAB";

interface IList {
    [key: string]: string
}

export class Confidence {
  static LOW = "low";
  static MEDIUM = "medium";
  static HIGH = "high";
}


export default class IABService {

  static getName(iab : string) : string {
    iab = iab.toUpperCase().trim();

    if (iab.indexOf('-') < 0) {
      if (IAB[iab])
        return IAB[iab].name;
      return '';
    }


    for(let tier1 of Object.keys(IAB)) {
      let parent = IAB[tier1];
      if (! parent.children[iab]) {
        continue;
      }

      return [parent.name, parent.children[iab].name].join(' > ');
    }

    return '';
  }

  static getNameForWeb(web : string) : string {
    web = web.toUpperCase().trim();


    for(let tier1 of Object.keys(IAB)) {
      if (IAB[tier1].id && IAB[tier1].id == web) {
        return IAB[tier1].name;
      }

      for(let tier2 of Object.keys(IAB[tier1].children)) {
        if (IAB[tier1].children[tier2].id && IAB[tier1].children[tier2].id == web) {
          return [IAB[tier1].name, IAB[tier1].children[tier2].name].join(' > ');
        }
      }
    }

    return '';
  }

  static getIABForWeb(web : string) : string {
    web = web.toUpperCase().trim();


    for(let tier1 of Object.keys(IAB)) {
      if (IAB[tier1].id && IAB[tier1].id == web) {
        return tier1;
      }

      for(let tier2 of Object.keys(IAB[tier1].children)) {
        if (IAB[tier1].children[tier2].id && IAB[tier1].children[tier2].id == web) {
          return tier2;
        }
      }
    }

    return '';
  }

  static getIncludeForWeb(web : string) : string {
    web = web.toUpperCase().trim();
    let includes = '';
    let iab = this.getIABForWeb(web);


    for(let tier1 of Object.keys(IAB)) {
      if (IAB[tier1].id && IAB[tier1].id == web && IAB[tier1].includes) {
        if (includes)
          includes += ', ';

        includes += IAB[tier1].includes
      }
      else if (IAB[tier1].merge && IAB[tier1].merge == iab) {
        if (includes)
          includes += ', ';

        includes += IAB[tier1].includes || IAB[tier1].name;
      }

      for(let tier2 of Object.keys(IAB[tier1].children)) {
        if (IAB[tier1].children[tier2].id && IAB[tier1].children[tier2].id == web && IAB[tier1].children[tier2].includes) {
          if (includes)
            includes += ', ';

          includes += IAB[tier1].children[tier2].includes;
        }
        else if (IAB[tier1].children[tier2].merge && IAB[tier1].children[tier2].merge == iab) {
          if (includes)
            includes += ', ';

          includes += IAB[tier1].children[tier2].includes || IAB[tier1].children[tier2].name;
        }
      }
    }

    return includes;
  }

  static getEmptyForWeb(web : string) : boolean {
    web = web.toUpperCase().trim();


    for(let tier1 of Object.keys(IAB)) {
      if (IAB[tier1].id && IAB[tier1].id == web) {
        return IAB[tier1].empty;
      }

      for(let tier2 of Object.keys(IAB[tier1].children)) {
        if (IAB[tier1].children[tier2].id && IAB[tier1].children[tier2].id == web) {
          return IAB[tier1].children[tier2].empty;
        }
      }
    }

    return false;
  }

  static getNotModelForWeb(web : string) : boolean {
    web = web.toUpperCase().trim();


    for(let tier1 of Object.keys(IAB)) {
      if (IAB[tier1].id && IAB[tier1].id == web) {
        return IAB[tier1].notModel;
      }

      for(let tier2 of Object.keys(IAB[tier1].children)) {
        if (IAB[tier1].children[tier2].id && IAB[tier1].children[tier2].id == web) {
          return IAB[tier1].children[tier2].notModel;
        }
      }
    }

    return false;
  }

  

  static getWebId(iab : string) : string {
    iab = iab.toUpperCase().trim();

    if (iab.indexOf('-') < 0) {
      if (IAB[iab])
        return IAB[iab].id;

      return '';
    }


    for(let tier1 of Object.keys(IAB)) {
      let parent = IAB[tier1];
      if (! parent.children[iab]) {
        continue;
      }

      return parent.children[iab].id;
    }

    return '';
  }

  // Merged list of names
  static getList(hide: boolean = true) : string[] {
    let list : string[] = [];

    for(let tier1 of Object.keys(IAB)) {
      if ( !(hide && IAB[tier1].empty) && ! IAB[tier1].hide)
        list.push(IAB[tier1].name);

      for(let tier2 of Object.keys(IAB[tier1].children)) {
        if ( !(hide && IAB[tier1].children[tier2].merge) && !IAB[tier1].children[tier2].hide)
          list.push([IAB[tier1].name, IAB[tier1].children[tier2].name].join(' > '));
      }
    }

    return list.sort((a : string , b: string) => a.toLowerCase().localeCompare(b.toLowerCase()));
  }

  static getListWebs(hide: boolean = true, hideTop: boolean = true) : string[] {
    let list : string[] = [];

    for(let tier1 of Object.keys(IAB)) {
      if (IAB[tier1].id && !(hideTop && IAB[tier1].empty) && ! IAB[tier1].hide)
        list.push(IAB[tier1].id);

      for(let tier2 of Object.keys(IAB[tier1].children)) {
        if (IAB[tier1].children[tier2].id && !(hide && IAB[tier1].children[tier2].merge) && !IAB[tier1].children[tier2].hide)
          list.push(IAB[tier1].children[tier2].id);
      }
    }

    return list.sort((a : string , b: string) => {
      let [aTier1, aTier2] = a.split(/-/);
      let [bTier1, bTier2] = b.split(/-/);

      let tier1 = aTier1.localeCompare(bTier2);
      if (tier1 == 0) {
        let num1 = parseInt(aTier2 || '0')
        let num2 = parseInt(bTier2 || '0');

        return num2 - num1;
      }
     
      return tier1;
    });
  }

  static getListIABs(hide: boolean = true) : string[] {
    let list : string[] = [];

    for(let tier1 of Object.keys(IAB)) {
      if ( !(hide && IAB[tier1].empty) && ! IAB[tier1].hide)
        list.push(tier1);

      for(let tier2 of Object.keys(IAB[tier1].children)) {
        if ( !(hide && IAB[tier1].children[tier2].merge) && !IAB[tier1].children[tier2].hide)
          list.push(tier2);
      }
    }

    return list.sort((a : string , b: string) => a.toLowerCase().localeCompare(b.toLowerCase()));
  }

  static finalMapping(iabs: string[], mapping: any, defaultMapping : string = '') {
    let result : string[] = [];
    for(let iab of iabs) {
      let found = false;

      // already a mapping
      if (Object.keys(mapping).includes(iab)) {
        // console.log(iab);
        result.push(iab);
        continue;
      }
  
      // tier2
      for (let category of Object.keys(mapping)) {
        if (mapping[category].includes(iab)) {
          result.push(category);
          found = true;
          break;
        }
      }
  
      // tier1
      if (!found && iab.indexOf('-') > 0) {
        let [tier1] = iab.split('-');
        for (let category of Object.keys(mapping)) {
          if (mapping[category].includes(tier1)) {
            result.push(category);
            found = true;
            break;
          }
        }
      }
  
      // other
      if (!found) {
        for (let category of Object.keys(mapping)) {
          if (mapping[category].length == 0) {
            result.push(category);
            found = true;
            break;
          }
        }
      }
    }

    // console.log(result);

    if (result.length == 0 && defaultMapping != '' && iabs.length > 0) {
      result.push(defaultMapping);
    }
    else if (result.length > 1 && result.includes('OTHER')) {
      result = result.filter((value: string) => value != 'OTHER');
    }
  
    return result;
  }

  static reverseMapping(categories: string[], mapping: any) { // return IABs
    let result : string[] = [];

    const IABList = IABService.getListIABs(true);

    let allMappingIABs : string[] = [];
    for(let category of Object.keys(mapping)) {
      allMappingIABs = allMappingIABs.concat(mapping[category]);
    }

    let missingIABs : string[] = IABList.filter((iab) => !allMappingIABs.includes(iab));

    for (let category of categories) {
      if (Object.keys(mapping).includes(category)) {
        result = result.concat(mapping[category]);
      }
      
      if (category == 'OTHER') {
        result = result.concat(missingIABs);
      }
    }
 
  
    return result;
  }

  static getFinalIABs(iabs: string[]) : string[] {
    return iabs.map((iab) => {
      if (iab.indexOf('-') < 0) {
        return iab;
      }

      for(let tier1 of Object.keys(IAB)) {
        let parent = IAB[tier1];

        if (! parent.children[iab]) {
          continue;
        }

        return parent.children[iab].merge || iab;
      }

      return iab; // not found!
    }).filter((value: string, index: number, array : string[]) => array.indexOf(value) === index);
  }

  static getFinalIAB(iab: string) : string {
    return this.getFinalIABs([iab])[0];
  }

  static getFinalIABTops(iabs: string[]) {
    return iabs.map((iab) => {
      let [tier1] = iab.split('-');


      for(let top of Object.keys(IAB)) {
        let parent = IAB[top];

        if (!parent.empty) {
          return tier1;
        }

        if (parent.merge) {
          return parent.merge;
        }
      }

      return iab;
    }).filter((value: string, index: number, array : string[]) => array.indexOf(value) === index);
  }

  static getListTop(force: boolean = false) {
    let list : string[] = [];
    for(let tier1 of Object.keys(IAB)) {
      if (! IAB[tier1].empty) {
        list.push(tier1);
      }
      else if (force && IAB[tier1].empty && IAB[tier1].children && Object.keys(IAB[tier1].children).length > 0) {
        list.push(tier1);
      }
      else if (force && IAB[tier1].empty && !IAB[tier1].hide) {
        list.push(tier1);
      }
      else {
        for(let tier2 of Object.keys(IAB[tier1].children)) {
          if ( !IAB[tier1].children[tier2].merge && !IAB[tier1].children[tier2].hide)
            list.push(tier2);
        }
      }
    }

    return list;
  }

  static getListHash(hide: boolean = true) : IList {
    let list : IList = {};

    for(let tier1 of Object.keys(IAB)) {
      if ( !(hide && IAB[tier1].empty) && !IAB[tier1].hide)
      list[tier1] = IAB[tier1].name;

      for(let tier2 of Object.keys(IAB[tier1].children)) {
        if ( !(hide && IAB[tier1].children[tier2].merge) && !IAB[tier1].children[tier2].hide)
          list[tier2] = [IAB[tier1].name, IAB[tier1].children[tier2].name].join(' > ');
      }
    }

    return list;
  }

  static getWebListHash(modelOnly: boolean = true) : IList {
    let list : IList = {};

    for(let tier1 of Object.keys(IAB)) {
      let id = IAB[tier1].id || '';
      if ( !(IAB[tier1].empty) && !IAB[tier1].hide && (!modelOnly && !IAB[tier1].notModel))
        list[id] = IAB[tier1].name;

      for(let tier2 of Object.keys(IAB[tier1].children)) {
        let id = IAB[tier1].children[tier2].id;
        if ( !IAB[tier1].children[tier2].merge && !IAB[tier1].children[tier2].hide && (!modelOnly || !IAB[tier1].children[tier2].notModel))
          list[id] = [IAB[tier1].name, IAB[tier1].children[tier2].name].join(' > ');
      }
    }

    return list;
  }

  static getMergedIABs(iab : string) : string[] {
    let list : string[] = [];
    for(let tier1 of Object.keys(IAB)) {

      for(let tier2 of Object.keys(IAB[tier1].children)) {
        if (IAB[tier1].children[tier2].merge && IAB[tier1].children[tier2].merge == iab) {
          list.push(tier2);
        }
      }
    }

    return list;
  }

  static mapWebToIab(webIds: string[]) {
    let list : string[] = [];

    for(let tier1 of Object.keys(IAB)) {
      if (webIds.includes(IAB[tier1].id)) {
        list.push(tier1);
      }

      for(let tier2 of Object.keys(IAB[tier1].children)) {
        if (webIds.includes(IAB[tier1].children[tier2].id)) {
          list.push(tier2);
        }
      }
    }

    return list;
  }

  static validate() : boolean {
    // unique IDs and missing ID
    let ids : string[] = [];
    for(let tier1 of Object.keys(IAB)) {
      if (IAB[tier1].id) {
        let id = IAB[tier1].id;

        if (ids.includes(id)) {
          console.error(`Duplicate ID: ${id}`);
          return false;
        }

        ids.push(id);
      }


      for(let tier2 of Object.keys(IAB[tier1].children)) {
        if (IAB[tier1].children[tier2].id) {
          let id = IAB[tier1].children[tier2].id;

          if (ids.includes(id)) {
            console.error(`Duplicate ID: ${id}`);
            return false;
          }

          ids.push(id);
        }
        else {
          // should there be an ID?
          if (! IAB[tier1].children[tier2].merge && !IAB[tier1].children[tier2].hide) {
            console.error(`Missing id for ${tier2}`);
            return false;
          }
        }
      }
    }

    // invalid merge value
    let list = this.getListHash(true);
    for(let tier1 of Object.keys(IAB)) {
      for(let tier2 of Object.keys(IAB[tier1].children)) {
        if (IAB[tier1].children[tier2].merge) {
          let merge = IAB[tier1].children[tier2].merge;

          if (! list[merge]) {
            console.error(`Invalid merge for ${tier2}`);
            return false;
          }
        }
      }
    }

    return true;
  }


  static getConfidence(iab : string, score: number) {
    // Same for all IABs for now
    // console.log(`${iab}: ${score}`);

    if (score >= 0.7) {
      return Confidence.HIGH;
    }
    else if (score >= 0.4) {
      return Confidence.MEDIUM;
    }
    else if (score >= 0.1) {
      return Confidence.LOW;
    }
    else {
      return '';
    }
  }

  // conversion IAB => WEB
  static displayPredictions(predictions: any[]) : any[] {
    let results = [];
    for(let prediction of predictions) {
      let confidence = IABService.getConfidence(prediction.iab || prediction.label, prediction.score || 0);

      if (confidence != '') {
        results.push({
          // id: IABService.getWebId(prediction.iab || prediction.label), // IAB is always final IAB since it comes from model
          id: prediction.iab,
          name: IABService.getName(prediction.iab || prediction.label),
          score: Math.round(prediction.score * 10) / 10,
          confidence
        });
      }
    }

    return results;
  }

}