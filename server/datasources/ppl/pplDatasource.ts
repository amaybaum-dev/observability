import _ from 'lodash';

export class PPLDataSource {
  
  private pplResult : any = {};

  constructor(pplResult) {
    this.pplResult = pplResult;
  }

  public getJSON = () => {
    const pplRes = this.pplResult;
    const res = {
      ...this.pplResult
    }
    const data = [];
    _.forEach(pplRes.datarows, (row) => {
      const record = {};
      for (let i = 0; i < pplRes.schema.length; i++) { 
        if (typeof(row[i]) === 'object') {
          record[pplRes.schema[i].name] = JSON.stringify(row[i]);
        } else if (typeof(row[i]) === 'boolean') {
          record[pplRes.schema[i].name] = row[i].toString();
        } else {
          record[pplRes.schema[i].name] = row[i];
        }
      }
      data.push(record);
    });
    res['jsonData'] = data;
    return res;
  };
  
}